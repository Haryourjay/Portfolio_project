from django.contrib import admin
from .models import User, PortfolioVideo, ShowcaseVideo


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'first_name', 'last_name', 'is_active']
    list_filter = ['is_active']
    search_fields = ['email', 'first_name', 'last_name']

@admin.register(PortfolioVideo)
class PortfolioVideoAdmin(admin.ModelAdmin):
    list_display = ['url', 'title', 'category', 'is_reel', 'created_at']
    list_filter = ['url', 'title', 'category', 'is_reel', 'created_at']
    search_fields = ['url', 'title']

@admin.register(ShowcaseVideo)
class ShowcaseVideoAdmin(admin.ModelAdmin):
    list_display = ['video__url', 'service_type', 'created_at']
    list_filter = ['video__url', 'service_type', 'created_at']
    search_fields = ['service_type']

