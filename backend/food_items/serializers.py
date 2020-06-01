from rest_framework import serializers
from .models import FoodItem


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FoodItem
        fields = "__all__"
