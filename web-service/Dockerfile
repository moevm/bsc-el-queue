FROM tknerr/baseimage-ubuntu:18.04
RUN apt-get update
RUN apt-get -y install vim nano
RUN apt-get install -y mongodb
RUN apt-get -y install apache2 libapache2-mod-wsgi-py3=4.5.17-1
RUN apt-get -y install python-pip python-dev python3-pip xvfb
RUN apt-get -y install firefox
# Chrome dependencies
#RUN apt-get -y install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libgcc1 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libuuid1 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
RUN apt-get clean
RUN service mongodb start
ADD ./web-service /server-test.com
WORKDIR /server-test.com
#RUN ./scripts/install_chrome.sh
RUN rm /etc/apache2/sites-enabled/000-default.conf
RUN service mongodb restart && ./scripts/local_deploy.sh
CMD /etc/init.d/apache2 restart && service mongodb restart &&  /usr/sbin/sshd -D \
    -o UseDNS=no\
    -o UsePAM=no\
    -o PasswordAuthentication=yes\
    -o UsePrivilegeSeparation=no\
    -o PidFile=/tmp/sshd.pid
