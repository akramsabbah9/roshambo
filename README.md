Roshambo
========================

## Description

Roshambo is a full-stack web app, designed to be the premiere destination for high-stakes games of rock-paper-scissors. In this version of Roshambo, two users duke it out in a no-holds-barred contest with AkramBucks on the line. The winner takes it all... but are you cool enough to play for keeps?

Users can create an account, log in, and begin playing against opponents immediately. They can also spend money to buy the game's premium currency, AkramBucks, with stripe-authenticated transactions. Players can join guilds and chat with other members. Roshambo uses a React-Bootstrap frontend, while Django Channels is used on the backend to connect two players to each other by websocket. This app uses docker containerization.

![userpage-screenshot](https://user-images.githubusercontent.com/59624292/123029037-55eb3d80-d395-11eb-90e2-fc9f6c3b4a1d.png)

## Prerequisites

 - [Docker 19.03.5+ & docker-compose 1.24.1+](https://medium.com/@yutafujii_59175/a-complete-one-by-one-guide-to-install-docker-on-your-mac-os-using-homebrew-e818eb4cfc3)

## Live Site

Visit https://roshambo-ucla.herokuapp.com to play Roshambo today!

## Local Usage

1.  From the root of the repo, run `docker-compose build` to build the docker containers.
2. To run them, use `docker-compose up`.
2. From there, http://localhost:8000 will link to the API, and http://localhost:3000 will link to the frontend.
4. Refer to `docker-compose` documentation for further options, such as running in detached mode.

#### Running Commands within the Containers

For some purposes (such as creating a Django superuser temporarily), it's easiest to head into the Docker container's shell to perform actions. This is easy. Follow these steps:

1. After starting the containers via `docker-compose up`, run `docker ps` to see the name of the available containers. Roshambo's should be named `roshambo_backend` and `roshambo_frontend`.
2. Run `docker exec -it <mycontainer> bash` to obtain shell access to the container.
3. Voila.

## Cleanup

1.  To stop the containers:
    - If not detached: use `Ctrl+C` in the terminal window from which you ran `docker-compose up`
    - Whether detached or not: run `docker-compose down`.
2. To clean up the containers' associated volumes as well, run `docker-compose down -v`.
3. To do a full compose stack cleanup, destroying images, volumes and dangling stuff, run `docker-compose down -v --rmi all --remove-orphans`.
4. To completely clear everything Docker-related: `docker system prune`.
5. Consult the Docker documentation for further options beyond these.

## Known Issues

Out of the box, when run locally, Stripe purchases will not work - we can't commit real secrets! To test Stripe functionality, either visit the live Heroku-deployed app, or reach out to our team to get the Stripe secret key.

#### Browser Compatibility

Please note, we only support Google Chrome! No testing has been done for other browsers, so use them at your own peril.

## Tech Stack Description

Roshambo is built using Django and React. Django incorporates Django Channels, and the Django Rest Framework. React utilizes React Bootstrap.

#### Frontend Main Packages

1. `react-bootstrap` for the main frontend developement
2. `react-redux` for state management.
3. `formik` for user form constructions.
4. `font-awesome` for basic icons and logos on the website.
5. `yup` for user input validation.

#### Backend Main Packages

1. `django` for the primary backend service.
2. `django rest framework` for RESTful resources.
3. `django channels` for matchmaking and websocket communications.

#### Summary

Refer to `backend/requirements.txt` for specific packages used in the backend, and to `frontend/package.json` for specific packages used in the frontend.
