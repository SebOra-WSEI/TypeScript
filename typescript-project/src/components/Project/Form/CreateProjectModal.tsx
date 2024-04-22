import React, { useState } from 'react';
import { ProjectBasic } from '../../../types/project';
import { useCreateProject } from '../../../queries/project/useCreateProject';
import { CreateProjectForm } from './ProjectForm';
import { defaultProject } from '../../../queries/project/project';
import { ModalContent } from '../../common/Modal/ModalContent';

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
