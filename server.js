const express = require('express');


const connectDB = require('./config/db');
const user = require('./routes/users')
const profile = require('./routes/profile');

const app = express();



// Init middleware
app.use(express.json());


//connect database
connectDB();
//Define routes
app.use('/', user);
app.use('/auth', require('./routes/auth'));
// app.use('/', profile)
app.use('/profile', require('./routes/profile'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server is runnig on Port ${PORT}`))