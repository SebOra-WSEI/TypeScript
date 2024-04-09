import React, { useState } from 'react';
import { useGetAllProjects } from '../../../api/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';
import { CreateProjectFormModal } from '../Create/Modal/CreateProjectFormModal';
import { SnackbarAlert } from '../../Snackbar/SnackbarAlert';

export const ProjectsListView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { loading, error, data } = useGetAllProjects();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error}</>;
  }

  const handleOnOpen = (): void => setIsModalOpen(true);
  const handleOnClose = (): void => setIsModalOpen(false);

  return (
    <>
      <ProjectsList projects={data} handleOnOpen={handleOnOpen} />
      <CreateProjectFormModal isOpen={isModalOpen} onClose={handleOnClose} />
      <SnackbarAlert />
    </>
  );
};
