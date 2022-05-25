export interface Token {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  session_state: string;
  preferred_username: string;
}

export interface TokenData {
  sub: string;
  sitios: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
