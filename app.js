const express = require('express');
const loginRouter = require('./routes/login.routers');
const registrRouter = require('./routes/registr.router');
const carRouter = require('./routes/car.routers');
const bodyParser = require('body-Parser');

const port = 5000;
const app = express();
app.use(bodyParser());

app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost:3000");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');    
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


app.use('/api', loginRouter);
app.use('/api', registrRouter);
app.use('/api', carRouter);

app.listen(port, function(){
    console.log(`Server started ${port}`);
})