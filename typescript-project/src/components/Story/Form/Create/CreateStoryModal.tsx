import React, { useState } from 'react';
import { StoryBasic } from '../../../../types/story';
import { CreateStoryForm } from './CreateStoryForm';
import { useCreateStory } from '../../../../queries/story/useCreateStory';
import { ModalContent } from '../../../common/ModalContent';
import { Priority } from '../../../../types/priority';
import { CURRENT_USER_ID, getFromLocalStorage } from '../../../../utils/localStorage';
import { State } from '../../../../types/state';

const defaultStory: StoryBasic = {
  name: '',
  description: '',
  priority: Priority.High,
  projectId: '',
  userId: getFromLocalStorage(CURRENT_USER_ID),
  state: State.Todo,
};

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [story, setStory] = useState<StoryBasic>(defaultStory);

  const { create } = useCreateStory(story);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await create();
  };

  const handleOnClose = (): void => {
    setStory(defaultStory);
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
