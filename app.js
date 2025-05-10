/*
* @file app.js
* @brief Main application setup and configuration for the Express server.
*
* This file sets up and configures the Express.js application, including middleware, routes, 
* error handling, and view engine configuration. It integrates various components such as routers, 
* session management, flash messages, and CORS settings.
*
* Key functionalities:
* - Configures Express application and middleware (e.g., body parsing, sessions, flash messages).
* - Sets up and configures Handlebars as the view engine with custom helpers.
* - Defines global variables and sets up routes for various pages (e.g., touch to activate, live streaming).
* - Handles errors with custom error pages and logs uncaught exceptions and unhandled rejections.
* - Listens on a specified port for incoming requests.
*
* Dependencies:
* - `express`: Web framework for building the server.
* - `express-handlebars`: Template engine for rendering views.
* - `handlebars`: Templating library.
* - `path`: Module for handling file paths.
* - `dotenv`: Module for loading environment variables.
* - `body-parser`: Middleware for parsing request bodies.
* - `cors`: Middleware for enabling Cross-Origin Resource Sharing.
* - `connect-flash`: Middleware for flash messages.
* - `express-session`: Middleware for session management.
* - `gStreamerVideoPlayer`: Custom module for handling GStreamer video playback.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');
const protobuf = require('protobufjs');
const errorHandler = require('./middleWare/errorHandler');
const AppError = require('./AppError');
const process = require('node:process');
const fs = require('fs');
const gCors = require('cors');
const bodyParser = require('body-parser');
const flash = require('connect-flash'); 
const session = require('express-session');
const GStreamerVideo = require('./gStreamer/gstVideoPlayer');
const { initializeWebSocket } = require('./services/WSLiveStream');


// Start express app
const app = express();

// For parsing application/json
app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// dotenv Config
dotenv.config({ path: './config.env' });
// Port
const port = process.env.PORT || 3000;

// Session configuration
app.use(session({ 
  secret: 'dmrcSession', 
  saveUninitialized: true, 
  resave: true
})); 

app.use(flash());

// Routers Configuration
const welcomeRouter = require('./routers/welcomeRouter');
const trainStatusRouter = require('./routers/trainStatusRouter');
const lineSelectionRouter = require('./routers/lineSelectionRouter');
const skipStationRouter = require('./routers/skipStationRouter');
const messageRouter = require('./routers/messageRouter');
const loginRouter = require('./routers/loginRouter');
const selfTestRouter = require('./routers/selfTestRouter');
const errorRouter = require('./routers/errorRouter');
const cctvRouter = require('./routers/cctvRouter');
const faultsRouter = require('./routers/faultsRouter');
const PADRouter = require('./routers/PADRouter');
const stationRouter = require('./routers/stationRouter');
const brightnessRouter = require('./routers/brightnessRouter');
const volumeRouter = require('./routers/volumeRouter');
const operationModeRouter = require('./routers/operationModeRouter');
const ctcRouter = require('./routers/ctcRouter');
const touchScreenRouter = require('./routers/touchScreenRouter');


//Global Varibale declaration for CCTV straming to access
global.nocache = function (res) {
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Expires", "0");
}

global.gStreamClass;
// Video played as fullscreen.
global.fsVideo = new GStreamerVideo();
global.gStreamClass = Array.from({ length: 4 }, () => new GStreamerVideo());

// Handlebars configuration
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    isStatusTrue: function (statusValue) {
      return statusValue ? 'status-active' : '';
    },
    isMissionState: function(misson) {
      return !misson ? 'Start Mission' : 'Stop Mission';
    },
    faultStatus: function (status) {
      switch(status) {
        case 'OK':
          return 'limegreen'; // Color for OK status
        case 'NG':
          return 'red'; // Color for NG status
        case 'NA':
          return 'lightgrey'; // Color for NA status
        default:
          return 'lightgrey'; // Default color
      }
    },
    currentPlayMsg: function (msgEventID, playingMessageEventID) {
      // If playingMessageEventID is undefined or null, return an empty string
      if (playingMessageEventID == null) return ''; 
      return msgEventID === playingMessageEventID ? 'selected' : 'msg-disabled';
    }
  },
});

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Setting Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// CORS configuration
app.use(gCors());

// Route handling
app.use('/', welcomeRouter);
app.use('/login', loginRouter);
app.use('/trainstatus', trainStatusRouter);
app.use('/lineselection', lineSelectionRouter);
app.use('/skipstation', skipStationRouter);
app.use('/messages', messageRouter);
app.use('/selfTest', selfTestRouter);
app.use('/cctv', cctvRouter);
app.use('/faults', faultsRouter);
app.use('/pad', PADRouter);
app.use('/station', stationRouter);
app.use('/brightness', brightnessRouter);
app.use('/volume', volumeRouter);
app.use('/operation', operationModeRouter);
app.use('/ctc', ctcRouter);
app.use('/touchScreen', touchScreenRouter);

// Globel variable
global.protobufRoot = null;
protobuf.load('public/data/LMTControl.proto', function (err, root) {
  //console.log('Protobuf Inside ---');
  if (err) throw err;
  protobufRoot = root;
});

// Load the MessageGateway Messages Proto file
global.messageProtoBuff = null;
protobuf.load('public/data/MessageGatewayMessages.proto', function(err, root) {
  if (err) throw(err);
  messageProtoBuff = root;
});

// Error Handling for all the routes
app.all('*', (req, res) => {
  res.render('pages/errorPage', {
    layout: 'index',
    statusCode: 404,
    message: `Can't find ${req.originalUrl} on the server!!`,
  });
});

// Global error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err, origin) => {
  console.error('UNHANDLED EXCEPTION:', err.name, err.message);
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\nException origin: ${origin}\n`
  );
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting DOWN...!!!');
  console.error(err.stack);
});

// Use custom error handling middleware
app.use(errorHandler);

// Create HTTP server and integrate WebSocket
const server = http.createServer(app);
initializeWebSocket(server); // Initialize WebSocket with the HTTP server

// Start the server
server.listen(port, '0.0.0.0', () => {
  console.log('Server has started on PORT:', port);
});