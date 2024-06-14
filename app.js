const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
mongoose
  .connect("mongodb+srv://sushensirohi:Shaneisbruhh@cluster0.xfrzmpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));

//! Middlewares
app.use(express.json()); //pass incoming json data from the user
//!Routes
app.use("/", router);
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = 8080;
app.listen(PORT, console.log(`Server is up and running`));
