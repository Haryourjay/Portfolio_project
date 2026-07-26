from django.urls import path
from .views import PortfolioVideoListView, ShowcaseVideoListView

urlpatterns = [
    path("videos/", PortfolioVideoListView.as_view(), name="portfolio-video-list"),
    path("videos/showcase", ShowcaseVideoListView.as_view(), name="showcase-video-list"),
]

