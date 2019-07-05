const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(bodyParser.json());

//app.get('/', (req, res) => res.json('OK doki'))

app.post('/auth', (req, res) => {
    const  { body, } = req;
    console.log('body ===------>', body);
    
    if( 
        ( !('username' in body) && body.username !== 'john' ) ||
        ( !('password' in body) && body.password !== 'pass' )
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

app.listen(3000, err => {
    console.log(`server runing on PORT: 3000`);
})
