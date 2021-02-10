require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port;
const Routes = require("./app/routes");

app.use([
    cors(),
    Routes
]);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
