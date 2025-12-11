import type { UserAuthData } from "../interface/api/auth-rest.interface";

export class PokemonsAuth {
  static authToRest(response: UserAuthData): UserAuthData {
    return {
      accessToken: response.accessToken,
      email: response.email,
      name: response.name,
      sub: response.sub,
    };
  }
}
