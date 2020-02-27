Roshambo
========================

Roshambo is a full-stack web app, designed to be the premiere destination for high-stakes games of rock-paper-scissors. 

## Prerequisites

 - [Docker 19.03.5+ & docker-compose 1.24.1+](https://medium.com/@yutafujii_59175/a-complete-one-by-one-guide-to-install-docker-on-your-mac-os-using-homebrew-e818eb4cfc3)

## Usage

1.  From the root of the repo, run `docker-compose build` to build the docker containers.
2. To run them, use `docker-compose up`.
2. From there, http://localhost:8000 will link to the API, and http://localhost:3000 will link to the frontend.
4. Refer to `docker-compose` documentation for further options, such as running in detached mode.

## Frontend Descriptions

1. `react-bootstrap` for the main frontend developement
2. `redux` for state management.
3. `axios` for http requests and responses.
4. `formik` for user form constructions.
5. `font-awesome` for basic icons and logos on the website.
6. `yup` for user input validation.
#### Running Commands within the Containers

For some purposes (such as creating a Django superuser temporarily), it's easiest to head into the Docker container's shell to perform actions. This is easy. Follow these steps:

1. After starting the containers via `docker-compose up`, run `docker ps` to see the name of the available containers. Roshambo's should be named `roshambo_backend` and `roshambo_frontend`.
2. Run `docker exec -it <mycontainer> bash` to obtain shell access to the container.
3. Voila.

## Testing

-  To test frontend components, run `npm run test`.
-  To test backend components, run `TODO: fill this in`.
-  TODO: travis ci.

## Cleanup

1.  To stop the containers:
    - If not detached: use `Ctrl+C` in the terminal window from which you ran `docker-compose up`
    - Whether detached or not: run `docker-compose down`.
2. To clean up the containers' associated volumes as well, run `docker-compose down -v`.
3. To do a full compose stack cleanup, destroying images, volumes and dangling stuff, run `docker-compose down -v --rmi all --remove-orphans`.
4. To completely clear everything Docker-related: `docker system prune`.
5. Consult the Docker documentation for further options beyond these.

## Tech Stack Description

Roshambo is built using Django and React. Django incorporates Django Channels, and the Django Rest Framework. React utilizes React Bootstrap. Refer to `backend/requirements.txt` for specific packages used in the backend, and to `package.json` for specific packages used in the frontend.
