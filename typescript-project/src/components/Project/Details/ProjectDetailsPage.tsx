import React from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { Navbar } from '../../common/Navbar';
import { StorageListView } from '../../Storage/List/StorageListView';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';

export const ProjectDetailsPage: React.FC = () => {
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
      <StorageListView storages={storages} />
    </>
  );
};
