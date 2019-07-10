import React, { useState} from "react"
import { Link, navigate, useStaticQuery } from "gatsby"

import SEO from "./seo"

import { isLoggedIn, handleLogin } from '../services/auth'

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
    console.log(state);
    setUi({loading: true});
    try {
      const data = await  fetch('http://127.0.0.1:4444/auth/session', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(state),
      }).then(r => r.json());
      console.log(data);
      if(data.status === 'OK')navigate('/app/profile');
      setUi(prevS => ({ ...prevS, loading: false, }))
    } catch (error) {
      alert(error.message)
      setUi(prevS => ({ ...prevS, message: error.message, loading: false, }))
    }
  }
  if ( isLoggedIn() ) navigate('/app/profile');
  return (
    <>
      <SEO title="Page two" />
      <h1>Login</h1>
      <form action="http://127.0.0.1:3000/auth" onSubmit={_onSubmit} method='POST'>
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
