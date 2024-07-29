const mongoose = require('mongoose');

const connection = () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            console.log("Database connected successfully");
        }) .catch((error) => {
            console.log(error, "Database connection failed");
        })
}

module.exports = connection;