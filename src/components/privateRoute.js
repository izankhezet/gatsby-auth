import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn, } from '../services/auth'

export default function PrivateRoute({ component: Component, location, ...rest}) {
 
  useEffect(() => {
    let noOnLoginPage = location.pathname !== `/app/login`
    if (!isLoggedIn() && noOnLoginPage) {
      navigate("/app/wplogin");
      //return null
    }
  }, []);

  return <Component {...rest} />
}
