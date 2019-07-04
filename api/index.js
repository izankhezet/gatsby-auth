const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/', (req, res) => res.json('OK doki'))

app.post('/', (req, res) => {
    const  { body } = req, errors = [];
    console.log(body);
    
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
