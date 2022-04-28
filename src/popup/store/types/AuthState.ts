import { User } from "../../../interface/User";

export interface AuthState {
  user: User | null;
  expired: boolean;
  uploadToken: string | null;
}
