#!/bin/bash

set -e
echo "Server: Deleting old server instances PIDs";
if [ -f ./gateway/tmp/pids/server.pid ]; then
  rm ./gateway/tmp/pids/server.pid
fi

cd ./gateway


exec "$@"
