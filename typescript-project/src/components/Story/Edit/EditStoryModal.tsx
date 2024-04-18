import React, { useState } from 'react';
import { StoryModel } from '../../../types/story';
import { EditStoryForm } from './EditStoryForm';
import { useEditStoryById } from '../../../api/story/useEditStoryById';
import { ModalContent } from '../../common/Modal/ModalContext';

interface EditStoryModalProps {
  story: StoryModel;
  isOpen: boolean;
  onClose: () => void;
}

export const EditStoryModal: React.FC<EditStoryModalProps> = ({
  isOpen,
  onClose,
  story,
}) => {
  const [updatedStory, setUpdatedStory] = useState<StoryModel>(story);

  const { update } = useEditStoryById(updatedStory);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    update(story.id);
  };

  return (
    <ModalContent
      isOpen={isOpen}
      handleOnClose={onClose}
      onSubmit={handleUpdate}
      type='update'
    >
      <EditStoryForm
        updatedStory={updatedStory}
        setUpdatedStory={setUpdatedStory}
      />
    </ModalContent>
  );
};
