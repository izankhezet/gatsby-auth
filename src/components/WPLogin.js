import React, { useState} from "react"
import { Link, navigate, useStaticQuery } from "gatsby"

import SEO from "./seo"

import { isLoggedIn, setUser } from '../services/auth'

const LoginPage = () => {
  const [state, setState] = useState({
    password: 'pass',
    username: 'john',
  });
  const [ui, setUi] = useState({
    message: null,
    loading: false,
  });
  const _onChange = ({ target }) => setState(prevState => ({...prevState, [target.name]: target.value}));
  const _onSubmit = async e => {
    e.preventDefault();
    setUi({loading: true});
    try {
      const _res = await  fetch('https://api.aalladine.com/wp-json/jwt-auth/v1/token', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(state),
      });
      const _data = await _res.json();
      if(_res.status === 200) {
        setUser(_data);
        setUi(prevS => ({ ...prevS, loading: false, }))
        return navigate('/app/profile');
      } 
      else if(_data.code === '[jwt_auth] ip_blocked')
        setUi(prevS => ({ ...prevS, message: _data.message, loading: false, }))
      else setUi(prevS => ({ ...prevS, message: 'Credentials incorrect', loading: false, }))
    } catch (error) {
      alert(error.message)
      setUi(prevS => ({ ...prevS, message: error.message, loading: false, }))
    }
  }
  if ( isLoggedIn() ) navigate('/app/profile');
  return (
    <>
      <SEO title="Login to wp account" />
      <h1>Login To WP Account</h1>
      <form action="/auth" onSubmit={_onSubmit} method='POST'>
        { ui.message }
        <label htmlFor="email">
          Username:
          <input onChange={_onChange} type="text" name="username" id="email"/>
        </label><br/>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" onChange={_onChange} />
        </label><br/>
        <button type="submit">
          {
            !ui.loading
              ? 'Log me in'
              : 'Loading ..'
          }
        </button>
      </form>
      <Link to="/">Go back to the homepage</Link>
    </>
  )
}

export default LoginPage
