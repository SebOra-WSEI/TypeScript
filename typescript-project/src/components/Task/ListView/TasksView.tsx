import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Navbar } from '../../Navbar/Navbar';
import { Loader } from '../../common/Loader';
import { SnackbarAlert } from '../../Snackbar/SnackbarAlert';
import { useGetStoryById } from '../../../api/story/useGetStoryById';
import { TasksNavbarMenuItems } from '../../Navbar/TasksNavbarMenuItems';
import { TasksList } from './List/TasksList';
import { CreateTaskFormModal } from '../Create/Modal/CreateTaskFormModal';
import { useGetTasksByStoryId } from '../../../api/task/useGetTasksByStoryId';

export const TasksView: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
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

  return (
    <>
      <Navbar data={story}>
        <TasksNavbarMenuItems handleCreateTaskOnOpen={handleCreateTaskOnOpen} />
      </Navbar>
      <TasksList
        tasks={tasks}
        handleCreateTaskOnOpen={handleCreateTaskOnOpen}
      />
      <CreateTaskFormModal
        isOpen={isCreateTaskModalOpen}
        onClose={handleCreateTaskOnClose}
      />
      <SnackbarAlert />
    </>
  );
};
