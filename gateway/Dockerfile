FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt
RUN apt-get update && apt-get install -y dos2unix
ENV RAILS_ROOT /var/www/

# Creates the directory and all the parents (if they don't exist)
RUN mkdir -p $RAILS_ROOT

# This is given by the Ruby Image.
# This will be the de-facto directory that 
# all the contents are going to be stored. 
WORKDIR $RAILS_ROOT

COPY ./gateway/Gemfile ./
COPY ./gateway/Gemfile.lock ./
RUN gem install bundler -v '2.0.1'
RUN gem install rake
RUN gem install rack
ENV BUNDLER_VERSION 2.0.1
ENV DB_NAME=moviesApp
ENV USER_DB=root
ENV PWD_DB=root
ENV DB_HOST=db
RUN bundle check || bundle install
ADD ./gateway ./
COPY ./gateway ./
COPY ./gateway/scripts/db_setup.sh /usr/bin/
COPY gateway/scripts/init.sh ./scripts/
COPY gateway/scripts/db_setup.sh ./scripts/
RUN chmod +x /usr/bin/db_setup.sh
RUN dos2unix ./scripts/db_setup.sh && dos2unix ./scripts/init.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/
ENTRYPOINT [ "bash","./gateway/scripts/db_setup.sh", "db", "bash", "./gateway/scripts/init.sh"]

