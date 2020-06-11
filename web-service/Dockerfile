FROM node:10

ADD ./web-service/front /front-test.com
WORKDIR /front-test.com
RUN yarn install && yarn run prod


FROM tknerr/baseimage-ubuntu:18.04

RUN apt-get update
RUN apt-get install -y mongodb
RUN apt-get -y install apache2 libapache2-mod-wsgi-py3=4.5.17-1
RUN apt-get -y install python-pip python-dev python3-pip xvfb
RUN apt-get clean
RUN service mongodb start

ADD ./web-service /server-test.com
WORKDIR /server-test.com
RUN rm /etc/apache2/sites-enabled/000-default.conf

COPY --from=0 "/front-test.com/dist/"  /var/www/front-test.com/public

RUN service mongodb restart && ./scripts/local_deploy.sh
CMD /etc/init.d/apache2 restart && service mongodb restart &&  /usr/sbin/sshd -D \
    -o UseDNS=no\
    -o UsePAM=no\
    -o PasswordAuthentication=yes\
    -o UsePrivilegeSeparation=no\
    -o PidFile=/tmp/sshd.pid
