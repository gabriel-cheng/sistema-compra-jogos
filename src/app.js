require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/index.router");
const cors = require("cors");
const mongoConnect = require("./database/index.database");

mongoConnect();
app.use(express.json());
app.use(cors());

app.use(router);

module.exports = app;
