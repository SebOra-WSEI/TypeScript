import React from 'react';
import { Box, Button, List } from '@mui/material';
import { ProjectModel } from '../../../../types/project';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import { ProjectListItem } from './ProjectListItem';

interface ProjectsListProps {
  projects: ProjectModel[] | undefined;
  handleOnOpen: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  handleOnOpen,
}) => (
  <Box sx={projectPageStyles.wrapper}>
    {!projects?.length ? (
      <NoProjectsMessage handleOnOpen={handleOnOpen} />
    ) : (
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
    )}
  </Box>
);

const NoProjectsMessage: React.FC<{
  handleOnOpen: () => void;
}> = ({ handleOnOpen }) => (
  <>
    <p>There are no projects yet</p>
    <Button onClick={handleOnOpen}>Create new project</Button>
  </>
);
