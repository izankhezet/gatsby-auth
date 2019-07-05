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
const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
// handle login system
export const handleLogin = async ({ username, password }) => {
  if (isBrowser) {
    try {
      let _res = await fetch('http://127.0.0.1:3000/auth', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        /*headers: {
          'ContentType': 'application/json'
        }*/
      });
      let data = await _res.json();
      console.log('response of fetching', data);
      
      if( data.status === 'OK' ) {
        setUser({
          username: `john`,
          name: `Johnny`,
          email: `johnny@example.org`,
        });
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
// logout current user
export const logout = callback => {
  setUser({})
  callback()
}