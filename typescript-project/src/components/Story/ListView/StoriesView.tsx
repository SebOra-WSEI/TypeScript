import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoriesList } from './List/StoriesList';
import { useGetStoragesByProjectId } from '../../../api/story/useGetStoriesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectFormModal } from '../../Project/Edit/Modal/EditProjectFormModal';
import { CreateStoryFormModal } from '../Create/Modal/CreateStoryFormModal';
import { SnackbarAlert } from '../../Snackbar/SnackbarAlert';

export const StoriesView: React.FC = () => {
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

  const handleCreateStorageOnOpen = (): void =>
    setIsCreateStorageModalOpen(true);
  const handleCreateStorageOnClose = (): void =>
    setIsCreateStorageModalOpen(false);

  return (
    <>
      <Navbar
        context={project}
        handleCreateStoryOnOpen={handleCreateStorageOnOpen}
        handleEditProjectOnOpen={handleEditProjectOnOpen}
      />
      <StoriesList
        stories={storages}
        handleCreateStoryOnOpen={handleCreateStorageOnOpen}
      />
      <EditProjectFormModal
        isOpen={isEditProjectModalOpen}
        onClose={handleEditProjectOnClose}
        project={project}
      />
      <CreateStoryFormModal
        isOpen={isCreateStorageModalOpen}
        onClose={handleCreateStorageOnClose}
      />
      <SnackbarAlert />
    </>
  );
};
