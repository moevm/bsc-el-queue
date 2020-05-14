#!/usr/bin/env bash

CATALOG='front-test.com'

yarn install && yarn run prod

rm -rf /var/www/"$CATALOG"

cp -r ./dist/*  /var/www/"$CATALOG"/public
