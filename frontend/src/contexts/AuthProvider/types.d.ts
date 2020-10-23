export interface AuthProviderUser {
  username: string,
  first_name: string,
  last_name: string,
  id: number,
  email: string
}

export type AuthContextType = {
  user: AuthProviderUser | null;
  token: string | null;
  loading: boolean;
  authenticated: boolean;
  hydrating: boolean;
  entrar(usuario: string, senha: string): void;
  sair(): void;
};
