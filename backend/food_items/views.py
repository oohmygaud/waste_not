from rest_framework import viewsets
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.response import Response

from .models import FoodItem, Recipe, Instruction, Ingredient
from .serializers import (
    FoodItemSerializer,
    RecipeSerializer,
    InstructionSerializer,
    IngredientSerializer,
)
from datetime import timedelta
from django.utils import timezone
import csv


def must_be_authed(request):
    if request.user.is_authenticated:
        return render(request, "base.html")
    else:
        return redirect("/login/")


def must_be_anon(request):
    if not request.user.is_authenticated:
        return render(request, "base.html")
    else:
        return redirect("/")


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()

    def get_queryset(self):
        qs = FoodItem.objects.filter(user=self.request.user)
        expiring_soon = self.request.GET.get("expiring_soon")
        status = self.request.GET.get("status")
        now = timezone.now()
        expiry = now + timedelta(days=5)
        print("Finding items younger than", expiry)
        if status:
            qs = qs.filter(status=status).order_by("exp_date")
        if expiring_soon:
            qs = qs.filter(exp_date__lte=expiry).order_by("exp_date")
            print("found", qs)
        return qs

    serializer_class = FoodItemSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        qs = Recipe.objects.all()
        search = self.request.GET.get("search")
        if search:
            qs = qs.filter(ingredients__name__icontains=search).distinct()
        return qs


class InstructionViewSet(viewsets.ModelViewSet):
    serializer_class = InstructionSerializer
    queryset = Instruction.objects.all()


class IngredientViewSet(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()


class StatusCount(APIView):
    def get(self, request, format=None):
        mine = FoodItem.objects.filter(user=request.user)
        total = mine.exclude(status="in_pantry").count()
        if total == 0:
            return Response([{"status": "wasted", "count": 0}, {"status": "eaten", "count": 0}])
        wastedCount = mine.filter(status="wasted").count() * 100 / total
        eatenCount = mine.filter(status="eaten").count() * 100 / total
        return Response(
            [{"status": "eaten", "count": eatenCount},{"status": "wasted", "count": wastedCount}]
        )
