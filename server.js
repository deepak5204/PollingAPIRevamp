const express = require("express");
const connectDB = require("./src/config/db");
const routerManager = require("./src/routes/router.manager");
const cors = require('cors')

const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())
app.use("/", routerManager);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
