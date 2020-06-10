from rest_framework import routers
from django.urls import path
from django.conf.urls import include, re_path
from . import views
from .views import FoodItemViewSet, RecipeViewSet, InstructionViewSet, IngredientViewSet


router = routers.SimpleRouter()
router.register(r"food_items", FoodItemViewSet)
router.register(r"recipes", RecipeViewSet)
router.register(r"ingredients", IngredientViewSet)
router.register(r"instructions", InstructionViewSet)

api_urlpatterns = [
    path("accounts/", include("rest_registration.api.urls")),
    path("status_count/", views.StatusCount.as_view()),
] + router.urls


urlpatterns = [
    path("api/", include(api_urlpatterns)),
    path("", views.must_be_authed),
    path("lookup/", views.must_be_authed),
    path("planner/", views.must_be_authed),
    path("food_list/", views.must_be_authed),
    path("register/", views.must_be_anon),
    path("login/", views.must_be_anon),
    re_path(r"^recipes/.*", views.must_be_authed),
    re_path(r"^lookup/.*", views.must_be_authed),
]
