import React, { useState, useEffect, useContext } from 'react';

import { checkingWPAuth, setUser, getUser, } from '../services/auth';
import { AuthContext } from '../store/context/auth';

const Splash = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const userHasValideToken = async () => {
      try {
        let _isValideToken = await checkingWPAuth();
        console.log(_isValideToken)
        if(_isValideToken) 
          setAuth({
            username: getUser().user_nicename,
            email: getUser().user_email
          })
        else setUser({});
      } catch (e) {
        setUser({});
        console.log("fired an error =>", e);
      } finally {
        setLoaded(true);
      }
    }
    userHasValideToken()
  }, []);

  if (loaded) return <>{children}</>
  return (
    <div style={{
      position: 'fixed',
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
