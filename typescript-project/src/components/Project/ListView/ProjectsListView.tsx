import React from 'react';
import { useGetAllProjects } from '../../../api/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';

export const ProjectsListView: React.FC = () => {
  const { loading, error, data } = useGetAllProjects();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <ProjectsList projects={data} />
  );
};
