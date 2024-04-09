import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoragesList } from './List/StoragesList';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectFormModal } from '../../Project/Edit/Modal/EditProjectFormModal';
import { CreateStorageFormModal } from '../Create/CreateStorageFormModal';
import { SnackbarAlert } from '../../Snackbar/SnackbarAlert';

export const StoragesView: React.FC = () => {
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] =
    useState<boolean>(false);
  const [isCreateStorageModalOpen, setIsCreateStorageModalOpen] =
    useState<boolean>(false);

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

  if (!project) {
    return <>Project not found</>;
  }

  const handleEditProjectOnOpen = (): void => setIsEditProjectModalOpen(true);
  const handleEditProjectOnClose = (): void => setIsEditProjectModalOpen(false);

  const handleCreateStorageOnOpen = (): void => setIsCreateStorageModalOpen(true);
  const handleCreateStorageOnClose = (): void => setIsCreateStorageModalOpen(false);

  return (
    <>
      <Navbar
        project={project}
        handleCreateStorageOnOpen={handleCreateStorageOnOpen}
        handleEditProjectOnOpen={handleEditProjectOnOpen}
      />
      <StoragesList
        storages={storages}
        handleCreateStorageOnOpen={handleCreateStorageOnOpen}
      />
      <EditProjectFormModal
        isOpen={isEditProjectModalOpen}
        onClose={handleEditProjectOnClose}
        project={project}
      />
      <CreateStorageFormModal
        isOpen={isCreateStorageModalOpen}
        onClose={handleCreateStorageOnClose}
      />
      <SnackbarAlert />
    </>
  );
};
