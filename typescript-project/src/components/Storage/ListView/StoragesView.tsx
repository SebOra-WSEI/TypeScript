import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { StoragesList } from './List/StoragesList';
import { useGetStoragesByProjectId } from '../../../api/storage/useGetStoragesByProjectId';
import { Navbar } from '../../Navbar/Navbar';
import { EditProjectFormModal } from '../../Project/Edit/Modal/EditProjectFormModal';
import { CreateStorageFormModal } from '../Create/CreateStorageFormModal';
import { SeverityOption } from '../../../types/severity';
import { SnackbarAlert } from '../../common/SnackbarAlert';

export const StoragesView: React.FC = () => {
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState<boolean>(false);
  const [isCreateStorageModalOpen, setIsCreateStorageModalOpen] = useState<boolean>(false);
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

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

  const handleEditProjectOnOpen = (): void =>
    setIsEditProjectModalOpen(true);

  const handleEditProjectOnClose = (): void =>
    setIsEditProjectModalOpen(false);

  const handleCreateStorageOnOpen = (): void =>
    setIsCreateStorageModalOpen(true);

  const handleCreateStorageOnClose = (): void =>
    setIsCreateStorageModalOpen(false);

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
        setSeverity={setSeverity}
        setSeverityText={setSeverityText}

      />
      <EditProjectFormModal
        isOpen={isEditProjectModalOpen}
        onClose={handleEditProjectOnClose}
        project={project}
        setSeverity={setSeverity}
        setSeverityText={setSeverityText}
      />
      <CreateStorageFormModal
        isOpen={isCreateStorageModalOpen}
        onClose={handleCreateStorageOnClose}
        setSeverity={setSeverity}
        setSeverityText={setSeverityText}
      />
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
    </>
  );
};
