import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoragesList } from './List/StoragesList';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectFormModal } from '../../Project/Edit/Modal/EditProjectFormModal';
import { Storage } from '../../../controllers/storage';
import { State } from '../../../types/state';
import { Priority } from '../../../types/priority';

export const StoragesView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { projectId } = useParams<{ projectId: string }>();

  // const EMPTY_STORAGE = new Storage(
  //   'Some task name 8',
  //   Priority.Minor,
  //   projectId,
  //   'fake',
  //   State.Doing,
  //   'Its a task description'
  // ).create();

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
    return <>Project not found</>
  }

  const handleOnEditModalOpen = (): void => setIsModalOpen(true);
  const handleOnClose = () => setIsModalOpen(false);

  return (
    <>
      <Navbar
        project={project}
        handleOnEditOpen={handleOnEditModalOpen}
      />
      <StoragesList storages={storages} />
      <EditProjectFormModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        project={project}
      />
    </>
  );
};
