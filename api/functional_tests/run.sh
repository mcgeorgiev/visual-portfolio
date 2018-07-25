#!/bin/bash
(
    export PORTFOLIO_DB=ft_db

    (cd ../ && cp db.sqlite3 ft_db.sqlite3)
    (cd ../ && yes yes | python manage.py flush && python manage.py migrate)
    (cd ../../ui && npm start) &
    (cd ../ && python manage.py runserver) &
    (cd ../ && python manage.py test functional_tests/) &&
    fg
)
NPM_PROCESS="$(ps aux | grep "[w]ebpack" | awk  '{print $2}')"
kill -9 ${NPM_PROCESS}

PYTHON_PROCESS="$(ps aux | grep "[p]ython manage" | awk  '{print $2}')"
kill -9 ${PYTHON_PROCESS}

(cd ../ && rm ft_db.sqlite3)
