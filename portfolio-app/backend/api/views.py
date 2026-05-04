# api/views.py
from rest_framework import viewsets
from .models import Profile, SocialLink, Experience, Skill, Project, Approach
from .serializers import (
    ProfileSerializer, 
    SocialLinkSerializer, 
    ExperienceSerializer, 
    SkillSerializer, 
    ProjectSerializer,
    ApproachSerializer
)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ApproachViewSet(viewsets.ModelViewSet):
    queryset = Approach.objects.all()
    serializer_class = ApproachSerializer