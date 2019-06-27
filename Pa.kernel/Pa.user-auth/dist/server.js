"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
//const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
//import router from './router/v1';
const main_1 = require("./config/main");
// init express
const app = express();
// init mongoose 
// make a bluebird default Promise
/*const Promise = require('bluebird');
require('mongoose').Promise = Promise;
mongoose.connect(config.db);*/
const Promise = require('bluebird');
require('mongoose').Promise = Promise;
mongoose.connect(main_1.default.db, {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});
/* mongoose.Promise = global.Promise;

const options = {
  promiseLibrary: global.Promise,
  useMongoClient: true,
};

function connect() {
  mongoose.connect(config.db, options)
    .then(function() {
      const admin = new mongoose.mongo.Admin(mongoose.connection.db);
      admin.buildInfo(function(err, info) {
        if (err) {
          console.error(`Error getting MongoDB info: ${err}`);
        } else {
          console.log(`Connection to MongoDB (version ${info.version}) opened successfully!`);
        }
      });
    })
    .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));
} */
// express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
// router
//router(app);
app.use('/users', require('./router/user.routes'));
// init server
let server;
if (process.env.NODE_ENV !== main_1.default.test_env) {
    server = app.listen(main_1.default.port, () => {
        console.log(`server listening on ${main_1.default.port}`);
    });
}
else {
    server = app.listen(main_1.default.test_port, () => {
        console.log(`server listening on ${main_1.default.test_port}`);
    });
}
// export
exports.default = server;
//module.exports = connect;
//# sourceMappingURL=server.js.map