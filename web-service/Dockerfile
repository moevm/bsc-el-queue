FROM tknerr/baseimage-ubuntu:18.04
RUN apt-get update
RUN apt-get -y install vim nano
RUN apt-get install -y mongodb
RUN apt-get -y install apache2 libapache2-mod-wsgi-py3=4.5.17-1
RUN apt-get -y install python-pip python-dev python3-pip xvfb
RUN apt-get clean
RUN curl -sL https://deb.nodesource.com/setup_12.x
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y nodejs
RUN apt-get update && apt-get install -y yarn
RUN service mongodb start
ADD ./web-service /server-test.com
WORKDIR /server-test.com
RUN rm /etc/apache2/sites-enabled/000-default.conf
RUN service mongodb restart && ./deploy.sh
CMD /etc/init.d/apache2 restart && service mongodb restart &&  /usr/sbin/sshd -D \
    -o UseDNS=no\
    -o UsePAM=no\
    -o PasswordAuthentication=yes\
    -o UsePrivilegeSeparation=no\
    -o PidFile=/tmp/sshd.pid
