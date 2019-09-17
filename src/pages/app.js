import React from "react"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import Profile from "../components/profile"
import Login from "../components/Login"
import WPLogin from '../components/WPLogin'
import PrivateRoute from "../components/privateRoute";

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute component={Profile} path="/app/profile" />
      <Login path="/app/login" />
      <WPLogin path='/app/wplogin' />
    </Router>
  </Layout>
)

export default App