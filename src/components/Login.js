import React, { useState} from "react"
import { Link, navigate } from "gatsby"

import SEO from "./seo"

import { isLoggedIn, handleLogin } from '../services/auth'

const LoginPage = () => {
  const [state, setState] = useState({
    email: 'johnny@example.org', password: 'pass', username: 'john'
  });
  const _onSubmit = e => {
    e.preventDefault();
    handleLogin(state);
    navigate('/app/profile');
  }
  if ( isLoggedIn() ) navigate('/app/profile');
  return (
    <>
      <SEO title="Page two" />
      <h1>Login</h1>
      <form action="//127.0.0.1:3000/api" onSubmit={_onSubmit}>
        <label htmlFor="email">
          Email: 
          <input type="text" name="email" id="email"/>
        </label>
        <label htmlFor="password">
          Email: 
          <input type="password" name="password" id="password"/>
        </label>
        <button type="submit">Log me in</button>
      </form>   
      <Link to="/">Go back to the homepage</Link>
    </>
  )
} 

export default LoginPage
