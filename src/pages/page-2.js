import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Login</h1>
    <form action="//127.0.0.1:3000/api">
      <label htmlFor="email">
        Email: 
        <input type="email" name="email" id="email"/>
      </label>
      <label htmlFor="password">
        Email: 
        <input type="password" name="password" id="password"/>
      </label>
      <button type="submit">Log me in</button>
    </form>   
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
