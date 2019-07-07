/**
 * Implement Gatsby's Browser APIs in this file.
 * @author siemah
 * @version 1.0.0
 * @see: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require('react');
const { Splash } = require('./src/components/Splash')

exports.wrapPageElement = ({ element, props }) => {
    return <Splash {...props}>{element}</Splash>
  }
