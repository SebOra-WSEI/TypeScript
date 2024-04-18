import React, { useState } from 'react';
import { useGetAllProjects } from '../../../queries/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';
import { CreateProjectModal } from '../Create/CreateProjectModal';
import { SnackbarAlert } from '../../Snackbar/SnackbarAlert';
import { Box } from '@mui/material';
import { projectPageStyles } from '../../../styles/projectPageStyles';

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
      <Box sx={projectPageStyles.wrapper}>
        <ProjectsList projects={data} handleOnOpen={handleOnOpen} />
      </Box>
      <CreateProjectModal isOpen={isModalOpen} onClose={handleOnClose} />
      <SnackbarAlert />
    </>
  );
};
