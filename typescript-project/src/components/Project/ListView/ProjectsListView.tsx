import React, { useState } from 'react';
import { useGetAllProjects } from '../../../queries/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';
import { CreateProjectModal } from '../Create/CreateProjectModal';
import { Box } from '@mui/material';
import { listStyles } from '../../../styles/listStyles';
import { Navbar } from '../../Navbar/Navbar';
import { useGetCurrentUser } from '../../../queries/user/useGetCurrentUser';
import { UserNotLogged } from '../../common/UserNotLogged';

export const ProjectsListView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: user } = useGetCurrentUser();
  const { loading, error, data } = useGetAllProjects();

  if (!user) {
    return <UserNotLogged />
  }

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
      <Navbar />
      <Box sx={listStyles.noItemsWrapper}>
        <ProjectsList projects={data} handleOnOpen={handleOnOpen} />
      </Box>
      <CreateProjectModal isOpen={isModalOpen} onClose={handleOnClose} />
    </>
  );
};
