import React, { useState } from 'react';
import { useGetAllProjects } from '../../../api/project/useGetAllProjects';
import { Loader } from '../../common/Loader';
import { ProjectsList } from './List/ProjectsList';
import { SeverityOption } from '../../../types/severity';
import { CreateProjectFormModal } from '../Create/Modal/CreateProjectFormModal';
import { SnackbarAlert } from '../../common/SnackbarAlert';

export const ProjectsListView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

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
      <ProjectsList
        projects={data}
        setSeverity={setSeverity}
        setSeverityText={setSeverityText}
        handleOnOpen={handleOnOpen}
      />
      <CreateProjectFormModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
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
