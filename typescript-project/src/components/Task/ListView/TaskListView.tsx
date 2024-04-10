import React, { useState } from "react";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar/Navbar";
import { Loader } from "../../common/Loader";
import { SnackbarAlert } from "../../Snackbar/SnackbarAlert";
import { useGetStoryById } from "../../../api/story/useGetStoryById";

export const TaskListView: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();

  const [isEditProjectModalOpen, setIsEditProjectModalOpen] =
    useState<boolean>(false);
  const [isCreateStorageModalOpen, setIsCreateStorageModalOpen] =
    useState<boolean>(false);

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

  const handleEditProjectOnOpen = (): void => setIsEditProjectModalOpen(true);
  const handleEditProjectOnClose = (): void => setIsEditProjectModalOpen(false);

  const handleCreateStorageOnOpen = (): void =>
    setIsCreateStorageModalOpen(true);
  const handleCreateStorageOnClose = (): void =>
    setIsCreateStorageModalOpen(false);

  return (
    <>
      <Navbar
        context={data}
        handleCreateStoryOnOpen={handleCreateStorageOnOpen}
        handleEditProjectOnOpen={handleEditProjectOnOpen}
      />
      <SnackbarAlert />
    </>
  )
}