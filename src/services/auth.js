import Axios from 'axios';
/**
 * @package dayenio.ml
 * @author izankhezet
 * @version 1.0.0
 * @description some services to use in front-end
 */
// check if we are in browser
export const isBrowser = () => typeof window !== "undefined"
// retrieve the loogedin user details or ...
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}
// set/update the current loggedin user
export const setUser = user => {
  document.cookie = `token=${user.token}`
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
}
// handle login system
export const handleLogin = async ({ username, password }) => {
  if (isBrowser) {
    console.info(`username ${username} and pass: ${password}`)
    try {
      let _res = await fetch('http://127.0.0.1:4444/auth', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({ username, password }),
      });
      let data = await _res.json()
      console.log('response of fetching', data);

      if( data.status === 'OK' ) {
        setUser(data.user);
        return data;
      } else throw new Error(data.error[0]);
    } catch (error) {
      throw new Error(error);
    }
  }
}
// check if user is loggedin
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}
// verify login
export const checkingAuth = async () => {
  const user = getUser();
  if(!!user.token) {
    return await Axios.get(`http://127.0.0.1:4444/auth/${user.token}`)
  }else {
    alert('nope', user.username)
    return false;
  }
}
// logout current user
export const logout = callback => {
  setUser({})
  callback()
}
