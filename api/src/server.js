// Load .env file in development
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use([require("./routes/zodiacs")]);

server.listen(7000, () => {
  console.log("Started at http://localhost:7000");
});
