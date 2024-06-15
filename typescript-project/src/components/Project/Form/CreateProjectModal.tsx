import React, { useState } from 'react';
import { ProjectBasic } from '../../../types/project';
import { useCreateProject } from '../../../queries/project/useCreateProject';
import { CreateProjectForm } from './ProjectForm';
import { defaultProject } from '../../../queries/project/project';
import { ModalContent } from '../../common/ModalContent';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [project, setProject] = useState<ProjectBasic>(defaultProject);

  const { create } = useCreateProject(project);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await create();
  };

  const handleOnClose = (): void => {
    setProject(defaultProject);
    onClose();
  };

  return (
    <ModalContent
      isOpen={isOpen}
      handleOnClose={handleOnClose}
      onSubmit={handleCreate}
      type='create'
    >
      <CreateProjectForm project={project} setProject={setProject} />
    </ModalContent>
  );
};
