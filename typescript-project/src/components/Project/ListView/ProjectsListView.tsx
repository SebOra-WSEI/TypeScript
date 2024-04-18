import React, { useState } from 'react';
import { useGetAllProjects } from '../../../queries/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';
import { CreateProjectModal } from '../Create/CreateProjectModal';
import { Box } from '@mui/material';
import { listStyles } from '../../../styles/listStyles';

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
      <Box sx={listStyles.noItemsWrapper}>
        <ProjectsList projects={data} handleOnOpen={handleOnOpen} />
      </Box>
      <CreateProjectModal isOpen={isModalOpen} onClose={handleOnClose} />
    </>
  );
};
