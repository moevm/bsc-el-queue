#!/usr/bin/env bash

CATALOG='front-test.com'

cd ./front || exit

yarn install && yarn run prod

rm -rf /var/www/"$CATALOG"
mkdir -p /var/www/"$CATALOG"/public

cp -r ./dist/*  /var/www/"$CATALOG"/public
