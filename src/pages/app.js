import React from "react"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import Profile from "../components/profile"
import Login from "../components/Login"
import PrivateRoute from "../components/privateRoute";

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute component={Profile} path="/app/profile" />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App