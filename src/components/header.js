import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { isLoggedIn, logout, getUser } from '../services/auth';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>&nbsp;
        {
          isLoggedIn() 
            ? (
                <>
                  <Link to="/app/profile/">{getUser().name}</Link>{` `}
                  <a href='#' onClick={() => {
                    logout(() => {
                      navigate('/app/login')
                    })
                  }}>Logout</a>
                </>)
            : <Link to="/app/login">Login</Link>
        }
        
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
