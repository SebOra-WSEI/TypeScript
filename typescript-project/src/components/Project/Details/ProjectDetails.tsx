import React from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoragesList } from '../../Storage/List/StoragesList';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';
import { Navbar } from '../../Navbar/Navbar';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    loading: projectLoading,
    error: projectError,
    data: project,
  } = useGetProjectById(projectId);

  const {
    loading: storagesLoading,
    error: storagesError,
    data: storages,
  } = useGetStoragesByProjectId(projectId);

  if (projectLoading || storagesLoading) {
    return <Loader />;
  }

  if (projectError || storagesError) {
    return <>{projectError || storagesError}</>;
  }

  return (
    <>
      <Navbar project={project} />
      <StoragesList storages={storages} />
    </>
  );
};
