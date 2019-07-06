/**
 * Implement Gatsby's Browser APIs in this file.
 * @author siemah
 * @version 1.0.0
 * @see: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require('react');

const Splash = (props) => {
    return (
        <div style={{
            position:'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: '#333',
            zIndex: 1000,
            color: '#666',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h1>Splash Screen</h1>
        </div>
    )
}

exports.wrapPageElement = ({ element, props }) => {
    return <Splash {...props}>{element}</Splash>
  }