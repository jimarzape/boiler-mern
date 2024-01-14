import * as bodyParser from "body-parser";
import express from "express";
import indexRoute from "../routes/index.route";
import joiErrorHandler from "../middleware/joiErrorHandler";
import * as errorHandler from "../middleware/apiErrorHandler";
import authenticate from "../middleware/authenticate";
import application from "../constants/application";

require("dotenv").config();

const morgan = require("morgan");
const http = require("http");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  exposedHeaders: ["set-cookie"],
  preflightContinue: false,
  allowedHeaders: [
    "Content-Type",
    "X-Requested-With",
    "X-HTTP-Method-Override",
    "Accept",
    "ats_cookie",
  ],
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use(authenticate);

// Router
app.use(application.url.base, indexRoute);

// Joi Error Handler
app.use(joiErrorHandler);
// Error Handler
app.use(errorHandler.notFoundErrorHandler);

app.use(errorHandler.errorHandler);

export default app;
