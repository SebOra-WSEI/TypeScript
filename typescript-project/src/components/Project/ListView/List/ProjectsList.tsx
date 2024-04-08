import React, { useState } from 'react';
import { Box, Button, List } from '@mui/material';
import { ProjectModel } from '../../../../types/project';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { CreateProjectFormModal } from '../../Create/Modal/CreateProjectFormModal';
import { SeverityOption } from '../../../../types/severity';
import { SnackbarAlert } from '../../../common/SnackbarAlert';
import { ProjectListItem } from './ProjectListItem';

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
              <ProjectListItem
                key={project.id}
                project={project}
                setSeverity={setSeverity}
                setSeverityText={setSeverityText}
              />
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
      <CreateProjectFormModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        setSeverity={setSeverity}
        setSeverityText={setSeverityText}
      />
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
    </Box>
  );
};