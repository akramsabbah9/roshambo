#!/bin/bash

if [ $DJANGO_ENV != "development" ]
then
  # the below should only be executed for dev environments
  exit 0
fi

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started!"
fi

python manage.py makemigrations
python manage.py migrate matchup zero
python manage.py migrate
python manage.py loaddata skins_inventory.json

exec "$@"
