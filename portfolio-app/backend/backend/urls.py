# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from api.views import (
    ProfileViewSet,
    SocialLinkViewSet,
    ExperienceViewSet,
    SkillViewSet,
    ProjectViewSet,
    ApproachViewSet
)

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'social-links', SocialLinkViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'approaches', ApproachViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)