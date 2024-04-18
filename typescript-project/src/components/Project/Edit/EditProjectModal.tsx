import React, { useState } from 'react';
import { ProjectFormBody, ProjectModel } from '../../../types/project';
import { EditProjectForm } from './EditProjectForm';
import { useEditProjectById } from '../../../api/project/useEditProjectById';
import { ModalContent } from '../../common/Modal/ModalContext';

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
  const [updatedProject, setUpdatedProject] = useState<ProjectFormBody>(project);

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
      <EditProjectForm
        project={updatedProject}
        setUpdatedProject={setUpdatedProject}
      />
    </ModalContent>
  );
};
