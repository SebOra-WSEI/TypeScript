import React, { useState } from 'react';
import { StoryFormBody } from '../../../types/story';
import { CreateStoryForm } from './CreateStoryForm';
import { useParams } from 'react-router';
import { useCreateStory } from '../../../queries/story/useCreateStory';
import { ModalContent } from '../../common/Modal/ModalContent';
import { defaultStory } from '../../../queries/story/story';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [story, setStory] = useState<StoryFormBody>({
    ...defaultStory,
    projectId,
  });

  const { create } = useCreateStory(story);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create();
  };

  const handleOnClose = (): void => {
    setStory({
      ...defaultStory,
      projectId,
    });
    onClose();
  };

  return (
    <ModalContent
      isOpen={isOpen}
      handleOnClose={handleOnClose}
      onSubmit={handleCreate}
      type='create'
    >
      <CreateStoryForm story={story} setStory={setStory} />
    </ModalContent>
  );
};
