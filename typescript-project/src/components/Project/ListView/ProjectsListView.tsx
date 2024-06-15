import React, { useState } from 'react';
import { useGetAllProjects } from '../../../queries/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';
import { CreateProjectModal } from '../Form/CreateProjectModal';
import { Box } from '@mui/material';
import { listStyles } from '../../../styles/listStyles';
import { Navbar } from '../../Navbar/Navbar';
import { useGetCurrentUser } from '../../../queries/user/useGetCurrentUser';
import { UserNotLoggedMessage } from '../../common/Messages/UserNotLoggedMessage';
import { UnknownError } from '../../common/Messages/UnknownError';

export const ProjectsListView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { error: userErrorMessage, data: d1 } = useGetCurrentUser();
  console.log(d1)
  const { loading, error, data } = useGetAllProjects();

  if (userErrorMessage) {
    return <UserNotLoggedMessage text={userErrorMessage} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <UnknownError errorMessage={error} />;
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
