import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../queries/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoriesList } from './List/StoriesList';
import { useGetStoriesByProjectId } from '../../../queries/story/useGetStoriesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectModal } from '../../Project/Edit/EditProjectModal';
import { CreateStoryModal } from '../Create/CreateStoryModal';
import { StoriesNavbarMenuItems } from '../../Navbar/StoriesNavbarMenuItems';
import { useGetCurrentUser } from '../../../queries/user/useGetCurrentUser';
import { UserNotLoggedMessage } from '../../common/Messages/UserNotLoggedMessage';
import { PageNotFoundMessage } from '../../common/Messages/PageNotFoundMessage';
import { UnknownError } from '../../common/Messages/UnknownError';

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
    loading: storiesLoading,
    error: storiesError,
    data: stories,
  } = useGetStoriesByProjectId(projectId);


  const { data: user } = useGetCurrentUser();

  if (!user) {
    return <UserNotLoggedMessage text='' />
  }

  if (projectLoading || storiesLoading) {
    return <Loader />;
  }

  if (projectError || storiesError) {
    return <UnknownError errorMessage={(projectError || storiesError) ?? ''} />
  }

  if (!project) {
    return <PageNotFoundMessage />
  }

  const handleEditProjectOnOpen = (): void => setIsEditProjectModalOpen(true);
  const handleEditProjectOnClose = (): void => setIsEditProjectModalOpen(false);

  const handleCreateStoryOnOpen = (): void => setIsCreateStoryModalOpen(true);
  const handleCreateStoryOnClose = (): void => setIsCreateStoryModalOpen(false);

  return (
    <>
      <Navbar data={project}>
        <StoriesNavbarMenuItems
          handleEditProjectOnOpen={handleEditProjectOnOpen}
          handleCreateStoryOnOpen={handleCreateStoryOnOpen}
        />
      </Navbar>
      <StoriesList
        stories={stories}
        handleCreateStoryOnOpen={handleCreateStoryOnOpen}
      />
      <EditProjectModal
        isOpen={isEditProjectModalOpen}
        onClose={handleEditProjectOnClose}
        project={project}
      />
      <CreateStoryModal
        isOpen={isCreateStoryModalOpen}
        onClose={handleCreateStoryOnClose}
      />
    </>
  );
};
