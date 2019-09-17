import React, { useState, } from 'react';
import Splash from './Splash';

import { Provider, authState } from '../store/context/auth';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authState);
  return (
    <Provider value={{
      ...auth,
      setAuth,
    }}>
      <Splash>{ children }</Splash>
    </Provider>
  )
}
