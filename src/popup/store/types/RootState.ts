import { CommonState } from "./CommonState";
import { AuthState } from "./AuthState";
import { CardState } from "./CardState";
import { TagState } from "./TagState";

export interface RootState {
  common: CommonState;
  auth: AuthState;
  card: CardState;
  tag: TagState;
}
