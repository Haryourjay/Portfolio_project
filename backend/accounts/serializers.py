from rest_framework import serializers
from .models import PortfolioVideo, ShowcaseVideo


class ShowcaseVideoSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ShowcaseVideo
        fields = [
            "id",
            "service_type",
            "tags",
            "video"
        ]

    def get_video(self, obj):
        return {
            "id": obj.video.id,
            "url" : obj.video.url,
            "title": obj.video.title,
            "category": obj.video.category,
            "description": obj.video.description,
            "is_reel": obj.video.is_reel,
            "created_at": obj.video.created_at,
            "updated_at": obj.video.updated_at
        }


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
