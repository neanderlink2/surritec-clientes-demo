import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect, useState
} from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api";
import { usePersistedState } from "../../hooks/usePersistedState";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FailedCallback, SuccessCallback } from "../../models/Requests/RequestsMethods";
import { LoginActions } from "../../store/modules/account/actions/tryLogin";
import Hydrating from "./Hydrating";
import { AuthContextType, AuthProviderUser } from "./types";


const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  token: null,
  entrar: () => { },
  sair: () => { },
  loading: false,
  user: null,
  hydrating: false
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const { successPayload: user, isRequesting } = useTypedSelector(states => states.account.login);

  const login = useCallback((username: string, password: string, onSuccess?: SuccessCallback, onFailed?: FailedCallback) => {
    dispatch(LoginActions.request({ login: username, password, onSuccess, onFailed }))
  }, [dispatch]);

  return { user, isRequesting, login };
}

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const { login } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);
  const [hydrating, setHydrating] = useState(true);
  const [usuario, setUsuario] = usePersistedState<AuthProviderUser | null>(
    "@app/user",
    null
  );
  const [token, setToken] = usePersistedState<string | null>(
    "@app/userToken",
    null
  );

  function entrar(nomeUsuario: string, senha: string) {
    setIsLoading(true);
    login(nomeUsuario, senha,
      (data) => {
        setToken(data.token);
        setTimeout(() => {
          api.get<AuthProviderUser>('/userinfo/me')
            .then((response) => {
              setUsuario(response.data);
              setIsLoading(false);
              toast.success(`Seja bem-vindo(a) ${response.data.first_name}`)
            })
        }, 1000);
      },
      (error) => {
        setIsLoading(false);
      });

  }

  function sair() {
    setUsuario(null);
    setToken(null);
  }

  useEffect(() => {
    setTimeout(() => {
      setHydrating(false);
    }, 500);
  }, []);

  if (hydrating || isLoading) {
    return <Hydrating />
  }

  return (
    <AuthContext.Provider
      value={{
        user: usuario,
        token,
        authenticated: !!usuario && !!token,
        entrar,
        sair,
        loading: isLoading,
        hydrating
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
