import React, { useEffect } from 'react';
import { Box, Button, List } from '@mui/material';
import { ProjectModel } from '../../../../types/project';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { SeverityOption } from '../../../../types/severity';
import { ProjectListItem } from './ProjectListItem';
import { useRemoveProject } from '../../../../api/project/useRemoveProject';

interface ProjectsListProps {
  projects: ProjectModel[] | undefined;
  setSeverity: (value: SeverityOption) => void;
  setSeverityText: (value: string) => void;
  handleOnOpen: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  setSeverity,
  setSeverityText,
  handleOnOpen,
}) => {
  const { error, message, remove } = useRemoveProject();

  useEffect(() => {
    if (error) {
      setSeverity(SeverityOption.Error);
      setSeverityText(error);
    }

    if (message) {
      setSeverity(SeverityOption.Success);
      setSeverityText(message);
    }
  }, [error, message]);

  return (
    <Box sx={projectPageStyles.wrapper}>
      {!projects?.length ? (
        <NoProjectsMessage handleOnOpen={handleOnOpen} />
      ) : (
        <>
          <List>
            {projects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                handleRemove={() => remove(project.id)}
              />
            ))}
          </List>
          <Button onClick={handleOnOpen} sx={projectPageStyles.button}>
            Create new project
          </Button>
        </>
      )}
    </Box>
  );
};

const NoProjectsMessage: React.FC<{
  handleOnOpen: () => void;
}> = ({ handleOnOpen }) => (
  <>
    <p>There are no projects yet</p>
    <Button onClick={handleOnOpen}>Create new project</Button>
  </>
);
