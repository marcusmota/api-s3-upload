const bodyParser = require("body-parser");
const express = require("express");
const expressValidator = require("express-validator");
const cors = require("cors");

const s3Controller = require("./controller");

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(expressValidator());
app.use(cors())

app.get('/v1/get-signed-url', s3Controller.getSignedUrl);
app.get('/v1/get-file/:file', s3Controller.getFileByName);

app.use(function (req, res, next) {
    res.status(404).send({"msg" : "invalid route"})
})

module.exports = app;
