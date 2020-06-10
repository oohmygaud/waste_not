from rest_framework import serializers
from .models import FoodItem, Recipe, Instruction, Ingredient


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FoodItem
        fields = ["id", "category", "exp_date", "name", "quantity", "unit", "status"]
        read_only_fields = ('user',)

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = ["title", "instructions", "ingredients", "id"]
        depth = 1

class InstructionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Instruction
        fields = "__all__"

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"
    