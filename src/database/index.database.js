const mongoose = require("mongoose");
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const express = require("express");
const app = express();

function mongoConnect() {
    mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.wvthnwq.mongodb.net/?retryWrites=true&w=majority`
    )
        .then(() => {
            app.listen(27017, () => {
                console.log("Banco conectado com sucesso! Rodando na porta 27017");
            });
        }).catch((err) => {
            console.log(`Connect Databasse Error: ${err}`);
        });
}

module.exports = mongoConnect;
