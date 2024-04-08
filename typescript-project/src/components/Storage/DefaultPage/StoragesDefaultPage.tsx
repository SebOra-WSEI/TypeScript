import React from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { Navbar } from '../../common/Navbar';
import { StoragesView } from '../List/StoragesView';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';

export const StoragesDefaultPage: React.FC = () => {
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
      <StoragesView storages={storages} />
    </>
  );
};
