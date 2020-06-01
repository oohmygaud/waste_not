from django.db import models
from waste_not.settings import base
from django import forms


class FoodItem(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=120)
    quantity = models.PositiveIntegerField()
    UNIT_CHOICES = [("serving", "serving"), ("count", "count"), ("package", "package")]
    unit = models.CharField(max_length=16, choices=UNIT_CHOICES, default="serving")
    exp_date = models.DateField()
    CATEGORY_CHOICES = [
        ("meat", "meat"),
        ("vegetable", "vegetable"),
        ("fruit", "fruit"),
        ("eggs", "eggs"),
        ("carb", "carb"),
        ("dairy", "dairy"),
        ("misc", "misc"),
    ]
    category = models.CharField(max_length=16, choices=CATEGORY_CHOICES, default="misc")
