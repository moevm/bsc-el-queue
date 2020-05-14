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
cp -r ./src/static /var/www/"$CATALOG"/static/
cp -r ./src/templates /var/www/"$CATALOG"/templates/
cp ./src/config/"${CONFIG}" /etc/apache2/sites-available/
mkdir /var/www/"$CATALOG"/tasks/
cp -r "${TASKS_CATALOG}"/utils /var/www/"$CATALOG"/tasks/utils
cp -r "${TASKS_CATALOG}"/truthtable_to_expression /var/www/"$CATALOG"/tasks/truthtable_to_expression

mongo users --eval 'db.logic_gates.drop()'
./scripts/db/import_tasks.sh

chown -R www-data:www-data /var/www/"$CATALOG"
a2enmod proxy_http
a2ensite "${CONFIG}"
service apache2 restart
