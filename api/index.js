const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'yoursecret',
  httpOnly: false,
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 24 // 24 hours
  }
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log('origin ---> ', req.headers.origin || req.headers.host);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || req.headers.host);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    // res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
// to check if session work
app.get('/', (req, res) => {
  console.log(req.session.user);
  if(req.session.v) {
    req.session.v++;
    return res.json('views: ' + req.session.v)
  }
  req.session.v=1;
  res.json('azul felak');
});
// session auth
app.post('/auth/session', (req, res) => {
  const  { body, } = req;
  // send an error
  // NOTE: hardcoded the logic
  if(
      ( !('username' in body) || body.username !== 'john' ) ||
      ( !('password' in body) || body.password !== 'pass' )
    ) {
      return res.json({
          status: 'NO',
          error: [
              'Pair username/password failed',
          ]
      });
  }
  req.session.user = 'john';
  res.json({
    status: 'OK',
    authMethod: 'session',
  })
});
// token verification and generate a new token for lloggedin user
app.get('/auth/:token', (req, res) => {
    let { params } = req;
    console.log('params', params);
    if( !'token' in params || params.token !== 'user-token' || params.token !== 'new-user-token' ) {
        return res.json({
            status: 'OK',
            user: {
                username: 'siemah',
                email: 'user@email.extension',
                token: params.token === 'user-token' ? 'new-user-token' : 'user-token',
            },
        })
    }
    res.json({
        status: 'NO',
        errors: ['Your credential are failed']
    })
})
//
app.post('/auth', (req, res) => {
    const  { body, } = req;
    // I hard code the process of verification in database
    // if the credentials are successed
    if(
        ( !('username' in body) || body.username !== 'john' ) ||
        ( !('password' in body) || body.password !== 'pass' )
        ) {
        return res.json({
            status: 'NO',
            error: [
                'Pair username/password failed',
            ]
        })
    }
    res.json({
        status: 'OK',
        user: {
            username: 'siemah',
            token: 'user-token',
        },
    })
});
// private route only for loggedin users using session
app.get('/posts', isLogged, (req, res) => {
  console.log(req.session);
  res.json({
    status: 'OK',
    posts: [
      {
        id: 1,
        title: 'Posit 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in '
      },
      {
        id: 2,
        title: 'Title of the 2nd post',
        content: 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ]
  })
})
function isLogged(req, res, next) {
  console.log('checking if loggedin', req.session.user);
  if(req.session.user) {
    return next();
  }
  res.status(403).json({
    status: 'NO',
    errors: ['Unothorised section']
  })
}

app.listen(4444, err => {
    console.log(`server runing on PORT: 4444`);
})
