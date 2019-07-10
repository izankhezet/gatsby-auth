/**
 * Implement Gatsby's Browser APIs in this file.
 * @author siemah
 * @version 1.0.0
 * @see: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require('react');
const { AuthProvider } = require('./src/components/AuthProvider');
const { ErrorBoundary } = require('./src/components/ErrorBoundary');

// wrape a whole page by a Splash screen
// exports.wrapPageElement = ({ element, props }) => {
//   return <ErrorBoundary {...props}>{element}</ErrorBoundary>
// }
// wrap a whole app by a provider to use global state
// in this case we use React context api rather than redux/mobx ..
exports.wrapRootElement = ({element}) => {
  // const [auth, setAuth] = useState(authState);
  return <AuthProvider>{ element }</AuthProvider>
}
