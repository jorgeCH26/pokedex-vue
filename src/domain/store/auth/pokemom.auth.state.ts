import { type Ref } from "vue";
import type {
  RequestUserPayload,
  UserAuthData,
} from "../../interface/api/auth-rest.interface";

export type AuthState = {
  user: Ref<UserAuthData | null>;
  isLoggedIn: Ref<boolean>;
  isLoading: Ref<boolean>;
  loginError: Ref<string | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  createUser: (payload: RequestUserPayload) => void;
};
