import React, { useState, useEffect, useContext } from 'react';

import { checkingAuth, setUser, } from '../services/auth';
import { AuthContext } from '../store/context/auth';

const Splash = ({children}) =>  {
  const [loaded, setLoaded] = useState(false);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      let { data } = await checkingAuth();
      if( data && data.status === 'OK' ) {
          setUser(data.user);// save loggedin user details in cookies or localStorage
          setAuth(data.user);// update the context of auth by the loggedin user details
      }
      setLoaded(true);
    }
    fetch()
  }, []);

  if(loaded) return <>{ children }</>
  return (
        <div style={{
            position:'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: '#333',
            zIndex: 1000,
            color: '#666',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h1>Splash Screen</h1>
        </div>
    )
}
export default Splash;
