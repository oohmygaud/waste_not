from django.db import models
from waste_not.settings import base
from django import forms
from users.models import User


class FoodItem(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(User, related_name="users", on_delete=models.CASCADE)
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
        ("carbs", "carbs"),
        ("dairy", "dairy"),
        ("misc", "misc"),
    ]
    category = models.CharField(max_length=16, choices=CATEGORY_CHOICES, default="misc")
    STATUS_CHOICES = [
        ("in_pantry", "in_pantry"),
        ("eaten", "eaten"),
        ("wasted", "wasted")
    ]
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default="in_pantry")

class Recipe(models.Model):
    objects = models.Manager()
    title = models.CharField(max_length=512)

class Instruction(models.Model):
    objects = models.Manager()
    order = models.PositiveIntegerField(default=0)
    step = models.CharField(max_length=2048)
    recipe = models.ForeignKey(Recipe, related_name='instructions', on_delete=models.CASCADE)

class Ingredient(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=512)
    recipe = models.ForeignKey(Recipe, related_name='ingredients', on_delete=models.DO_NOTHING)