import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { EMPTY_TASK } from './task';
import { TaskBasic } from '../../types/task';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';

type UseEditTaskByIdResult = { update: (taskId: string) => void };

export const useEditTaskById = (newTask: TaskBasic): UseEditTaskByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (taskId: string) => {
    const { status, response, message } = EMPTY_TASK.update(taskId, newTask);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setTimeout(() => {
        setError('');
      }, ERROR_DELAY);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, REDIRECT_DELAY);
    }
  };

  useSetSeverity(error, message);

  return { update };
};
