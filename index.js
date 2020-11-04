const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors')
let port = process.env.PORT || 3000;

//import routes
const authRoute = require('./routes/auth');
const eventRoute = require('./routes/event');

dotenv.config();

//Connect to Database
mongoose.connect(process.env.DB_CONNECT,
{ useUnifiedTopology: true } ,
() => console.log('Connected to database'));

app.use(cors());

//Middleware
app.use(express.json());

//Router middleware
app.use('/api/user', authRoute);
app.use('/api/event', eventRoute);


app.listen(port,() => console.log('Server listening on port: 3000'))


//https://youtu.be/2jqok-WgelI?t=1484