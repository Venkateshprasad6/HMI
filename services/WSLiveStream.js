const express = require('express');
const router = express.Router();
const http = require('http');
const WebSocket = require('ws');
const RtspFfmpeg = require('../services/rtsp-ffmpeg');

// Create a server for the router
const server = http.createServer(router);

// Set up WebSocket server on the router's server
const wss = new WebSocket.Server({ server });

const cams = ['rtsp://admin:CATSAdetel1@10.0.36.73:554/live1s3.sdp', 'rtsp://admin:CATSAdetel1@10.0.36.74:554/live1s3.sdp'].map(
  function (uri, i) {
    const stream = new RtspFfmpeg.FFMpeg({
      input: uri,
      resolution: '380x380',
      quality: 1,
    });
    stream.on('start', function () {
      //console.log('stream ' + i + ' started');
    });
    stream.on('stop', function () {
      //console.log('stream ' + i + ' stopped');
    });
    return stream;
  }
);

cams.forEach(function (camStream, i) {
  const streamURL = '/cam' + i;
  wss.on('connection', function (ws, req) {
    if (req.url === streamURL) {
      const pipeStream = function (data) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      };

      camStream.on('data', pipeStream);

      ws.on('close', function () {
        //console.log('disconnected from ' + streamURL);
        camStream.removeListener('data', pipeStream);
      });
    }
  });
});

wss.on('connection', function (ws) {
  ws.send(JSON.stringify({ event: 'start', data: cams.length }));
});

// Start the WebSocket server
server.listen(9000, function () {
  console.log('WebSocket server listening on localhost: 9000');
});