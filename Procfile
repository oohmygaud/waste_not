web: gunicorn waste_not.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=waste_not -B --loglevel=info
