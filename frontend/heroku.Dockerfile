ARG VERSION=12.2.0

FROM node:${VERSION} as builder

ENV APP_HOME /roshambo-build
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
COPY prod.env $APP_HOME

RUN npm install
RUN npm run build

RUN ls -lah $APP_HOME
RUN ls -lah $APP_HOME/scaffold
RUN ls -lah $APP_HOME/scaffold/bundle

FROM node:${VERSION} as final

ENV APP_SERVE /app
RUN mkdir $APP_SERVE
WORKDIR $APP_SERVE

RUN ls -lah $APP_HOME

COPY --from=builder $APP_HOME/scaffold/bundle $APP_SERVE
RUN npm install -g serve
