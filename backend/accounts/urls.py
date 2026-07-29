from django.urls import path
from .views import PortfolioVideoListView, ShowcaseVideoListView, EmailView

urlpatterns = [
    path("portfolio/", PortfolioVideoListView.as_view(), name="portfolio-video-list"),
    path("videos/showcase/", ShowcaseVideoListView.as_view(), name="showcase-video-list"),
    path("contacts/", EmailView.as_view(), name='cantact-view'),
]