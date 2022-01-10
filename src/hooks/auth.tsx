import React, { createContext, useCallback, useState, useContext } from "react";

import api from "../services/api";

import { toast } from "react-toastify";

interface User {
  user_id: string;
  email: string;
  roles: string[];
}
interface AuthState {
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@RochaIncrivel:user");
    if (user) {
      return { user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    await api
      .get(`analysts?email=${email}`)
      .then((response) => {
        if (!response.data.length || response.data[0].password !== password) {
          finishRequest(false);
        } else {
          const { email, user_id, roles } = response.data[0];
          const user = {
            user_id,
            email,
            roles,
          };
          localStorage.setItem("@RochaIncrivel:user", JSON.stringify(user));
          setData({ user });
          finishRequest(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        finishRequest(false);
      });
  }, []);

  const finishRequest = (status: boolean) => {
    if (status) {
      toast.success("Usuário logado com sucesso!");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
  };

  const signOut = useCallback(() => {
    localStorage.removeItem("@RochaIncrivel:user");
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within  an AuthProvider");
  }

  return context;
}
