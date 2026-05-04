from django.contrib import admin
from .models import Profile, SocialLink, Experience, Skill, Project, Approach

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')
    search_fields = ('name', 'title')

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'order')
    list_filter = ('platform',)
    ordering = ('order',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'company', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'employment_type')
    search_fields = ('job_title', 'company', 'description')
    ordering = ('-start_date',)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'color')
    list_filter = ('category', 'proficiency')
    search_fields = ('name',)
    ordering = ('category', '-proficiency', 'name')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'is_featured', 'date_completed')
    list_filter = ('project_type', 'is_featured')
    search_fields = ('title', 'description')
    filter_horizontal = ('technologies',)
    ordering = ('-date_completed',)

@admin.register(Approach)
class ApproachAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    ordering = ('order',)
