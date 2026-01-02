import type { User } from './user';
import type { Session } from './session';

export type AuthContext = {
  user: User | null;
  session: Session | null;
};
