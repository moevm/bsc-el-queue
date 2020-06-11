#!/bin/bash

mongo tst-arch --eval 'db.getCollectionNames()'
mongo tst-arch --eval "db.dropDatabase()"
mongo tst-arch --eval 'db.getCollectionNames()'
