import React, { useState } from 'react';
import { ProjectFormBody } from '../../../types/project';
import { useCreateProject } from '../../../api/project/useCreateProject';
import { CreateProjectForm } from './CreateProjectForm';
import { defaultProject } from '../../../api/project/project';
import { ModalContent } from '../../common/Modal/ModalContext';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [project, setProject] = useState<ProjectFormBody>(defaultProject);

  const { create } = useCreateProject(project);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create();
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
