from django.core import management

from waste_not import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
