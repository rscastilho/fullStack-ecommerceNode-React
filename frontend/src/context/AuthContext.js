import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import webApi from '../api/webApi';
import jwtdecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState('');
  const [expireToken, setExpireToken] = useState('');
  const contador = JSON.parse(localStorage.getItem('@carrinho')) || [];
  const [itensCarrinho, setItensCarrinho] = useState(contador.length || '');
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [pagina, setPagina] = useState(0);

  // eslint-disable-next-line
  const validar = token => {
    const result = jwtdecode(token);
    setPerfil(result.perfil);
    setExpireToken(result.exp);
    return;
  };

  useMemo(() => {
    const authenticate = localStorage.getItem('@token');
    if (authenticate) {
      webApi.defaults.headers.authorization = `bearer ${authenticate}`;
      validar(authenticate);
      setAuthenticated(true);
    }
  }, []);


  useEffect(() => {
    const authenticate = localStorage.getItem('@token');
    if (authenticate) {
      webApi.defaults.headers.authorization = `bearer ${authenticate}`;
      validar(authenticate);
      setAuthenticated(true);
    }
  }, [perfil, validar]);

  return (
    <>
      <AuthContext.Provider
        value={{ authenticated, setAuthenticated, perfil, setPerfil, itensCarrinho, setItensCarrinho, setItensPorPagina, itensPorPagina, setPagina, pagina }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
