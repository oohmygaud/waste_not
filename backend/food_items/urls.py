from rest_framework import routers
from django.urls import path
from django.conf.urls import include
from . import views
from .views import FoodItemViewSet

router = routers.SimpleRouter()
router.register(r'food_items', FoodItemViewSet)

api_urlpatterns = [path("accounts/", include("rest_registration.api.urls"))] + router.urls

urlpatterns = [
    path("", views.view_home),
    path("api/", include(api_urlpatterns)),
]
