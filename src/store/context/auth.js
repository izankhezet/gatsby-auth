import React, { createContext } from 'react';
// auth context default value
export const authState = {
  username: null,
  email: null,
};
// auth context
export const AuthContext = createContext(authState);
// Provider component
export const { Provider } = AuthContext;
