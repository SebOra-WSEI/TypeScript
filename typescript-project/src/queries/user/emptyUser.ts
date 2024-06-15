import { User } from '../../controllers/user';
import { UserRole } from '../../types/user';

/**
 * @deprecated Used only to the old implementation based on localStorage
 */
export const EMPTY_USER = new User('', '', UserRole.Admin);
