import React, { useState } from 'react';
import { Box, Button, Divider, List } from '@mui/material';
import { ProjectModel } from '../../../types/project';
import { projectPageStyles } from '../../../styles/projectsPage';
import { FormModal } from '../Modal/FormModal';
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
    <>
      <Box sx={projectPageStyles.wrapper}>
        {!projects?.length ? (
          <p>There are no projects yet</p>
        ) : (
          <List sx={projectPageStyles.wrapper}>
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                setSeverity={setSeverity}
                setSeverityText={setSeverityText}
              />
            ))}
            <Divider sx={projectPageStyles.divider} />
          </List>
        )}
        <Button onClick={handleOnOpen}>Create new project</Button>
      </Box>
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
      <FormModal isOpen={isModalOpen} onClose={handleOnClose} />
    </>
  );
};
