/**
 * Implement Gatsby's Browser APIs in this file.
 * @author siemah
 * @version 1.0.0
 * @see: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require('react');
const Axios = require('axios');
const { checkingAuth, setUser } = require('./src/services/auth')
const { useState, useEffect } = React;

const Splash = ({children}) =>  {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      console.log('checking ..');
      let { data } = await checkingAuth();
      if( data && data.status === 'OK' ) {
          setUser(data.user);
      }
      setLoaded(true);
    }
    fetch()
  }, []);

  if(loaded) {
    return (
      <>{ children }</>
    )
  }
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

exports.wrapPageElement = ({ element, props }) => {
    return <Splash {...props}>{element}</Splash>
  }
