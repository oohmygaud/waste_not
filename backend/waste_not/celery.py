# coding: utf-8

from __future__ import absolute_import

import os

from django.apps import apps

from celery import Celery

from .celerybeat_schedule import CELERYBEAT_SCHEDULE


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "waste_not.settings.local")

app = Celery("waste_not_tasks")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks(lambda: [n.name for n in apps.get_app_configs()])
app.conf.update(CELERYBEAT_SCHEDULE=CELERYBEAT_SCHEDULE)
