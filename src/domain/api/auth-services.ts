import type {
  RequestUserPayload,
  UserAuthData,
} from "../interface/api/auth-rest.interface";
import { PokemonsAuth } from "../mappers/auth.mappers";
import { authApi } from "./auth-api";

export const loginServices = async (
  email: string,
  password: string
): Promise<UserAuthData> => {
  const payload = { email, password };

  const { data } = await authApi.post<UserAuthData>("auth/login", payload);
  return PokemonsAuth.authToRest(data);
};

export const createUserServices = async (
  payload: RequestUserPayload
): Promise<UserAuthData> => {
  const { data } = await authApi.post("auth/create-user", payload);
  return PokemonsAuth.authToRest(data);
};
