export interface UserAuthData {
  sub: string;
  email: string;
  name: string;
  accessToken: string;
}

export interface RequestUserPayload {
  password: string;
  email: string;
  name: string;
}
