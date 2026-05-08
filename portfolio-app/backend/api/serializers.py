# api/serializers.py
from rest_framework import serializers
from easy_thumbnails.files import get_thumbnailer
from .models import Profile, SocialLink, Experience, Skill, Project, Approach, CourseTraining, Certification

class ProfileSerializer(serializers.ModelSerializer):
    profile_image_cropped = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_profile_image_cropped(self, obj):
        """Return the cropped profile image URL"""
        if obj.profile_image and obj.cropping:
            try:
                thumbnailer = get_thumbnailer(obj.profile_image)
                thumbnail = thumbnailer.get_thumbnail({
                    'size': (400, 400),
                    'box': obj.cropping,
                    'crop': True,
                    'detail': True,
                })
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(thumbnail.url)
                return thumbnail.url
            except:
                return None
        elif obj.profile_image:
            # Return original if no cropping
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None

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

class CourseTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTraining
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'