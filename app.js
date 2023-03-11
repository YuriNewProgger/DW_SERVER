const express = require('express');
const cors = require('cors');
const loginRouter = require('./routes/login.routers');
const registrRouter = require('./routes/registr.router');
const carRouter = require('./routes/car.routers');
const rentRouter = require('./routes/rent.routers');
const userRouter = require('./routes/users.routers');
const blacListRouter = require('./routes/blacklist.routers');



const port = 5000;
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(express.json({limit: "50mb"}));


app.use('/api', loginRouter);
app.use('/api', registrRouter);
app.use('/api', carRouter);
app.use('/api', rentRouter);
app.use('/api', userRouter);
app.use('/api', blacListRouter);

app.use(express.static(__dirname + "/public"));

app.listen(port, function(){
    console.log(`Server started ${port}`);
})