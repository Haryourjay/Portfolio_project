from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import PortfolioVideo, ShowcaseVideo
from .serializers import PortfolioVideoSerializer, ShowcaseVideoSerializer


class PortfolioVideoListView(ListAPIView):
    queryset = PortfolioVideo.objects.prefetch_related("showcase_video").order_by("-created_at")
    serializer_class = PortfolioVideoSerializer
    permission_classes = [AllowAny]

class ShowcaseVideoListView(ListAPIView):
    queryset = ShowcaseVideo.objects.select_related("videos").order_by("-created_at")
    serializer_class = ShowcaseVideoSerializer
    permission_classes = [AllowAny]

