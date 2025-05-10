#!/bin/sh
echo "Running HMI-UI service"
/app/bin/HwTestTool --pwm --lcd 0 --write --duty 100
BASE_DIR=$(dirname $0)
cd $BASE_DIR
#npm start
node app.js
