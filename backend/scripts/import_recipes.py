from food_items.models import Recipe, Instruction, Ingredient
import csv
import json

def run():
    Recipe.objects.all().delete()
    with open("full_format_recipes.json") as f:
        data = json.load(f)
        count = 0
        for i in data:
            count = count + 1
            recipe = Recipe(title=i['title'])
            recipe.save()
            print('created')

            for idx, d in enumerate(i['directions']):
                direction = Instruction(recipe=recipe, order=idx, step=d)
                direction.save()
            for idx, ing in enumerate(i['ingredients']):
                ingredient = Ingredient(recipe=recipe, name=ing)
                ingredient.save()
            if count >= 500:
                return
