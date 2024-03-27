import React from 'react';
import { useGetAllProjects } from '../../../hooks/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { Box } from '@mui/material';
import { ProjectsList } from './ProjectsList';
import { projectPageStyles } from '../../../styles/projectsPage';

export const ProjectsPage: React.FC = () => {
  const { loading, error, data } = useGetAllProjects();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <Box sx={projectPageStyles.box}>
      <h2 style={projectPageStyles.header}>Projects</h2>
      <ProjectsList projects={data} />
    </Box>
  );
};
