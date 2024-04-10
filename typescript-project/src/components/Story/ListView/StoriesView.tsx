import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoriesList } from './List/StoriesList';
import { useGetStoriesByProjectId } from '../../../api/story/useGetStoriesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectFormModal } from '../../Project/Edit/Modal/EditProjectFormModal';
import { CreateStoryFormModal } from '../Create/Modal/CreateStoryFormModal';
import { SnackbarAlert } from '../../Snackbar/SnackbarAlert';
import { StoryNavbarMenuItems } from '../../Navbar/StoryNavbarMenuItems';

export const StoriesView: React.FC = () => {
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] =
    useState<boolean>(false);
  const [isCreateStoryModalOpen, setIsCreateStoryModalOpen] =
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
  } = useGetStoriesByProjectId(projectId);

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

  const handleCreateStoryOnOpen = (): void => setIsCreateStoryModalOpen(true);
  const handleCreateStorageOnClose = (): void =>
    setIsCreateStoryModalOpen(false);

  return (
    <>
      <Navbar data={project}>
        <StoryNavbarMenuItems
          handleEditProjectOnOpen={handleEditProjectOnOpen}
          handleCreateStoryOnOpen={handleCreateStoryOnOpen}
        />
      </Navbar>
      <StoriesList
        stories={storages}
        handleCreateStoryOnOpen={handleCreateStoryOnOpen}
      />
      <EditProjectFormModal
        isOpen={isEditProjectModalOpen}
        onClose={handleEditProjectOnClose}
        project={project}
      />
      <CreateStoryFormModal
        isOpen={isCreateStoryModalOpen}
        onClose={handleCreateStorageOnClose}
      />
      <SnackbarAlert />
    </>
  );
};
