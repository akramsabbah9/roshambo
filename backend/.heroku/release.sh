#!/bin/bash

# These are run by Heroku before deployment of a new release.
# Basically, ensuring migrations are run, and base data is in the skins table.

python manage.py makemigrations
python manage.py migrate matchup zero
python manage.py migrate
python manage.py loaddata skins_inventory.json
