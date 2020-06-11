#!/bin/bash

scripts/db/mongo.sh -l -H localhost:27017 users
if [ $? -gt 0 ]; then
        echo 'Error occured while imorting database users'
        exit 1
fi
