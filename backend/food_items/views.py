from rest_framework import viewsets
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import FoodItem
from .serializers import FoodItemSerializer
from datetime import timedelta
from django.utils import timezone


def view_home(request):
    return render(request, "base.html")


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()

    def get_queryset(self):
        now = timezone.now()
        expiry = now + timedelta(days=5)
        print("Finding items younger than", expiry)
        qs = (
            FoodItem.objects.exclude(exp_date__lte=now)
            .filter(exp_date__lte=expiry)
            .order_by("exp_date")
        )
        print("found", qs)
        return qs

    serializer_class = FoodItemSerializer
