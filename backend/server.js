const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const dbConnect = require('./db/dbconnect');

const userRoute = require('./routes/userRoute');

const productRoute = require('./routes/productRoute');

const contactRoute = require('./routes/contactRoute');

const errorHandler = require('./middleware/errorMiddleware');
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
}))

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contact-us', contactRoute);

//Error Middleware
app.use(errorHandler);

const port = process.env.POR || 3000;

dbConnect();


app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`) 
    });

