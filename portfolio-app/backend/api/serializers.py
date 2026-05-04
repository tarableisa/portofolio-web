# api/serializers.py
from rest_framework import serializers
from .models import Profile, SocialLink, Experience, Skill, Project, Approach

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    # Include projects count
    projects_count = serializers.IntegerField(source='projects.count', read_only=True)
    
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    # Nested serializer to show tech stack details
    technologies = SkillSerializer(many=True, read_only=True)
    technology_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Skill.objects.all(), 
        source='technologies', 
        write_only=True
    )
    
    class Meta:
        model = Project
        fields = '__all__'

class ApproachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approach
        fields = '__all__'