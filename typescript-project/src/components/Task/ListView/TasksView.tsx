import React, { useState } from "react";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar/Navbar";
import { Loader } from "../../common/Loader";
import { SnackbarAlert } from "../../Snackbar/SnackbarAlert";
import { useGetStoryById } from "../../../api/story/useGetStoryById";
import { StoryNavbarMenuItems } from "../../Navbar/StoryNavbarMenuItems";
import { TasksList } from "./List/TasksList";

export const TasksView: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
    useState<boolean>(false);

  const { storyId } = useParams<{ storyId: string }>();

  const { loading, error, data, } = useGetStoryById(storyId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error}</>;
  }

  if (!data) {
    return <>Story not found</>;
  }

  const handleCreateTaskOnOpen = (): void =>
    setIsCreateTaskModalOpen(true);

  return (
    <>
      <Navbar data={data}>
        <StoryNavbarMenuItems />
      </Navbar>
      <TasksList
        tasks={[]}
        handleCreateTaskOnOpen={handleCreateTaskOnOpen}
      />
      <SnackbarAlert />
    </>
  )
}