import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Navbar } from '../../Navbar/Navbar';
import { Loader } from '../../common/Loader';
import { useGetStoryById } from '../../../queries/story/useGetStoryById';
import { TasksNavbarMenuItems } from '../../Navbar/TasksNavbarMenuItems';
import { TasksList } from './List/TasksList';
import { CreateTaskFormModal } from '../Create/CreateTaskFormModal';
import { useGetTasksByStoryId } from '../../../queries/task/useGetTasksByStoryId';
import { EditStoryModal } from '../../Story/Edit/EditStoryModal';
import { useGetCurrentUser } from '../../../queries/user/useGetCurrentUser';
import { UserNotLogged } from '../../common/UserNotLogged';

export const TasksView: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
    useState<boolean>(false);
  const [isEditStoryModalOpen, setIsEditStoryModalOpen] =
    useState<boolean>(false);

  const { storyId } = useParams<{ storyId: string }>();

  const {
    loading: storyLoading,
    error: storyError,
    data: story,
  } = useGetStoryById(storyId);

  const {
    loading: tasksLoading,
    error: tasksError,
    data: tasks,
  } = useGetTasksByStoryId(storyId);


  const { data: user } = useGetCurrentUser();

  if (!user) {
    return <UserNotLogged text='' />
  }

  if (storyLoading || tasksLoading) {
    return <Loader />;
  }

  if (storyError || tasksError) {
    return <>{storyError || tasksError}</>;
  }

  if (!story) {
    return <>Story not found</>;
  }

  const handleCreateTaskOnOpen = (): void => setIsCreateTaskModalOpen(true);
  const handleCreateTaskOnClose = (): void => setIsCreateTaskModalOpen(false);

  const handleEditStoryOnOpen = (): void => setIsEditStoryModalOpen(true);
  const handleEditStoryOnClose = (): void => setIsEditStoryModalOpen(false);

  return (
    <>
      <Navbar data={story}>
        <TasksNavbarMenuItems
          handleCreateTaskOnOpen={handleCreateTaskOnOpen}
          handleEditStoryOnOpen={handleEditStoryOnOpen}
        />
      </Navbar>
      <TasksList
        tasks={tasks}
        handleCreateTaskOnOpen={handleCreateTaskOnOpen}
      />
      <EditStoryModal
        isOpen={isEditStoryModalOpen}
        onClose={handleEditStoryOnClose}
        story={story}
      />
      <CreateTaskFormModal
        isOpen={isCreateTaskModalOpen}
        onClose={handleCreateTaskOnClose}
      />
    </>
  );
};
