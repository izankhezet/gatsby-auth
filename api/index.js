const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.get('/', (req, res) => res.json(req.body))

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


app.listen(3000, err => {
    console.log(`server runing on PORT: 3000`);
})
