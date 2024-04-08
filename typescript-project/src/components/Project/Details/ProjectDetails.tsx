import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoragesList } from '../../Storage/List/StoragesList';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectFormModal } from '../Edit/Modal/EditProjectFormModal';

export const ProjectDetails: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
