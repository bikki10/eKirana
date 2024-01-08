const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');


require('dotenv/config');


//Execute express
const app = express();



//Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('tiny')); // for logging api info
app.use(authJwt());
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err
        })
    }
});







//Routes
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');

app.use(express.urlencoded());



const api = process.env.API_URL;
const db = process.env.CONNECTION_STRING;



app.use(`${api}/products`, productRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/user`, userRoutes);

//Database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'bookify_backend'
}).then(() => {
    console.log('DATABASE IS READY')
}).catch((err) => {
    console.log(err);
});


//Hosting


app.listen(3000, () => {
    console.log(api);
    console.log('Server is running at Port 3000');
});