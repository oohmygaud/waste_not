from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect


urlpatterns = [
    path("", include("food_items.urls")),
    path("admin/", admin.site.urls, name="admin"),
]
