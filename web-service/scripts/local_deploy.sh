#!/usr/bin/env bash
# use option -l to local start without docker


# for local config use ./scripts/local_deploy.sh -c local -l

TASKS_CATALOG='./tasks'

CATALOG='server-test.com'
HOST='server-test.com'

while getopts ":c:l" opt
do
case $opt in
    l) 
       TASKS_CATALOG='../tasks'
       date +'%Y-%m-%d %T' > DEBUG
       git branch | grep "*">> DEBUG
       git log -1 | grep commit >> DEBUG
    ;;
    c) 
       CATALOG=$OPTARG;
       HOST="computer-architecture-practice"
    ;;
esac
done

CONFIG=$CATALOG.conf
HOSTS_STRING="127.0.1.1       ${HOST}"

mkdir -p /mongodb/rs0
mongod --replSet rs0 --dbpath /mongodb/rs0  --bind_ip 127.0.0.1 --port 27018 --fork --logpath /mongodb/mongodb.log

python3 -m easy_install --upgrade pyOpenSSL
pip3 install -r scripts/requirements.txt

if ! grep -Fxq "$HOSTS_STRING" /etc/hosts
then
    echo "$HOSTS_STRING" >> /etc/hosts
fi

rm -rf /var/www/"$CATALOG"
mkdir -p /var/www/"$CATALOG"

cp DEBUG /var/www/"$CATALOG"
cp ./src/*.py  /var/www/"$CATALOG"
cp ./src/"$CATALOG".wsgi /var/www/"$CATALOG"
cp ./src/config/"${CONFIG}" /etc/apache2/sites-available/

mongo --port 27018 < ./scripts/init_replica.js

chown -R www-data:www-data /var/www/"$CATALOG"
a2enmod proxy_http
a2enmod headers
a2ensite "${CONFIG}"
service apache2 restart
