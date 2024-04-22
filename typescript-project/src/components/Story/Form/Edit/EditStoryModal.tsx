import React, { useState } from 'react';
import { StoryBasic, StoryModel } from '../../../../types/story';
import { EditStoryForm } from './EditStoryForm';
import { useEditStoryById } from '../../../../queries/story/useEditStoryById';
import { ModalContent } from '../../../common/ModalContent';

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
  const [updatedStory, setUpdatedStory] = useState<StoryBasic>(story);

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
