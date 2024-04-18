import { User } from '../../controllers/user';
import { UserRole } from '../../types/user';

export const EMPTY_USER = new User('', '', UserRole.Admin);
