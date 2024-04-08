import React, { useState } from 'react';
import { Box, Button, List } from '@mui/material';
import { ProjectModel } from '../../../types/project';
import { projectPageStyles } from '../../../styles/projectPageStyles';
import { FormModal } from '../CreateProject/Modal/FormModal';
import { SeverityOption } from '../../../types/severity';
import { SnackbarAlert } from '../../common/SnackbarAlert';
import { ProjectItem } from './ProjectItem';

interface ProjectsListProps {
  projects: ProjectModel[] | undefined;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

  const handleOnOpen = (): void => setIsModalOpen(true);
  const handleOnClose = () => setIsModalOpen(false);

  return (
    <Box sx={projectPageStyles.wrapper}>
      {!projects?.length ? (
        <>
          <p>There are no projects yet</p>
          <Button onClick={handleOnOpen}>Create new project</Button>
        </>
      ) : (
        <>
          <List>
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectItem
                  key={project.id}
                  project={project}
                  setSeverity={setSeverity}
                  setSeverityText={setSeverityText}
                />
              </div>
            ))}
          </List>
          <Button
            onClick={handleOnOpen}
            sx={projectPageStyles.button}
          >
            Create new project
          </Button>
        </>
      )}
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
      <FormModal isOpen={isModalOpen} onClose={handleOnClose} />
    </Box>
  );
};