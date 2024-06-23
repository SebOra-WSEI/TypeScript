import { Subject } from 'rxjs';
import {
  MESSAGES,
  getFromLocalStorage,
  setToLocalStorage,
} from './localStorage';

export const addMessage = (message: string) => {
  const subject = new Subject<string>();

  subject.subscribe({
    next: (message) => {
      const messagesArray: Array<string> = JSON.parse(
        getFromLocalStorage(MESSAGES)
      );
      messagesArray.push(message);
      setToLocalStorage(MESSAGES, JSON.stringify(messagesArray));
    },
  });

  subject.next(`${new Date().toLocaleDateString()} - ${message}`);
};
