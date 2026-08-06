from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import PortfolioVideo, ShowcaseVideo, Email
from .serializers import PortfolioVideoSerializer, ShowcaseVideoSerializer, EmailSerializer

from .email_service import EmailService



class PortfolioVideoListView(ListAPIView):
    queryset = PortfolioVideo.objects.all()
    serializer_class = PortfolioVideoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.order_by("order")
        return queryset

class ShowcaseVideoListView(ListAPIView):
    queryset = ShowcaseVideo.objects.select_related("video").order_by("-created_at")
    serializer_class = ShowcaseVideoSerializer
    permission_classes = [AllowAny]

class EmailView(GenericAPIView):
    serializer_class = EmailSerializer
    queryset = Email.objects.all()
    permission_classes = [AllowAny]

    def success(self, data=None, message="Success", code=status.HTTP_200_OK):
        return Response({
            "status": "success",
            "message": message,
            "data": data
        }, status=code)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email_instance = serializer.save(sent=False)
        email_service = EmailService(email_instance)
        
        email_service.send_email_notification()

        return self.success(
            message="Email sent successfully."
        )

