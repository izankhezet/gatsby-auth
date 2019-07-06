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
const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
// handle login system
export const handleLogin = async ({ username, password }) => {
  if (isBrowser) {
    console.info(`username ${username} and pass: ${password}`)
    try {
      let _res = await Axios.post('http://127.0.0.1:3000/auth', {
        //method: "POST", // *GET, POST, PUT, DELETE, etc.
        //mode: "cors", // no-cors, cors, *same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        /*headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Content-Type": "application/x-www-form-urlencoded",
        },*/
        //redirect: "follow", // manual, *follow, error
        //referrer: "no-referrer", // no-referrer, *client
        /*data: */username, password ,
      });
      let { data } = _res
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