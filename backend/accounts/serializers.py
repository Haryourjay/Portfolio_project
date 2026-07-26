from rest_framework import serializers
from .models import PortfolioVideo, ShowcaseVideo


class ShowcaseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseVideo
        fields = [
            "id",
            "service_type",
            "tags",
        ]


class PortfolioVideoSerializer(serializers.ModelSerializer):
    showcase_video = ShowcaseVideoSerializer(many=True, read_only=True)

    class Meta:
        model = PortfolioVideo
        fields = [
            "id",
            "url",
            "title",
            "category",
            "description",
            "is_reel",
            "created_at",
            "updated_at",
            "showcase_video",
        ]
        