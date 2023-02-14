const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connection");
const userRoutes = require("./routes/user");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/users", userRoutes);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
