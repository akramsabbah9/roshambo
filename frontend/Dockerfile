FROM node:12.2.0

ENV APP_HOME /roshambo-ui
RUN mkdir $APP_HOME

WORKDIR $APP_HOME

# Folders
COPY js $APP_HOME/js
COPY scaffold $APP_HOME/scaffold

# Files
COPY package.json $APP_HOME
COPY package-lock.json $APP_HOME
COPY webpack.config.js $APP_HOME
COPY .babelrc $APP_HOME
COPY .docker/entrypoint.sh $APP_HOME/.docker
COPY dev.env $APP_HOME

RUN npm install
