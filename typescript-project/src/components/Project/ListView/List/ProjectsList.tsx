import React from 'react';
import { Button, List } from '@mui/material';
import { ProjectModel } from '../../../../types/project';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { ProjectListItem } from './ProjectListItem';
import { NoProjectsMessage } from '../NoProjectsMessage';

interface ProjectsListProps {
  projects: Array<ProjectModel> | undefined;
  handleOnOpen: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  handleOnOpen,
}) => {
  if (!projects?.length) {
    return <NoProjectsMessage handleOnOpen={handleOnOpen} />;
  }

  return (
    <>
      <List>
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </List>
      <Button onClick={handleOnOpen} sx={projectPageStyles.button}>
        Create new project
      </Button>
    </>
  );
};
