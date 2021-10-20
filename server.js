//dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const {PORT, MONGODB_URL} = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
const productsController = require('./controllers/products')
app.use('/', productsController)

//listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));