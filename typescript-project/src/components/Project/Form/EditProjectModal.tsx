import React, { useState } from 'react';
import { ProjectBasic, ProjectModel } from '../../../types/project';
import { useEditProjectById } from '../../../queries/project/useEditProjectById';
import { ModalContent } from '../../common/Modal/ModalContent';
import { CreateProjectForm } from './ProjectForm';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModel;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [updatedProject, setUpdatedProject] = useState<ProjectBasic>(project);

  const { update } = useEditProjectById(updatedProject);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    update(project.id);
  };

  return (
    <ModalContent
      isOpen={isOpen}
      handleOnClose={onClose}
      onSubmit={handleUpdate}
      type='update'
    >
      <CreateProjectForm
        project={updatedProject}
        setProject={setUpdatedProject}
      />
    </ModalContent>
  );
};
