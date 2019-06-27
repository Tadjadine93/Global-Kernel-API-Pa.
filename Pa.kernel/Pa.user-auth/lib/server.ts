import * as express from 'express';
import * as mongoose from 'mongoose';
//const mongoose = require('mongoose');
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

//import router from './router/v1';
import config from './config/main';

// init express
const app = express();

// init mongoose 
// make a bluebird default Promise
/*const Promise = require('bluebird');
require('mongoose').Promise = Promise;
mongoose.connect(config.db);*/



const Promise = require('bluebird');
require('mongoose').Promise = Promise;
mongoose.connect(config.db, {
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
app.use(bodyParser.urlencoded({extended: false}));
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
if (process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port, () => {
        console.log(`server listening on ${config.port}`);
    });
} else {
    server = app.listen(config.test_port, () => {
        console.log(`server listening on ${config.test_port}`);
    });
}

// export
export default server;
//module.exports = connect;