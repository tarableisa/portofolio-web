# api/models.py
from django.db import models
from image_cropping import ImageRatioField

# 1. Profile/About Section
class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)  # e.g., "Adaptable Software Engineer"
    bio = models.TextField()  # Short description
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    cropping = ImageRatioField('profile_image', '400x400', free_crop=True)
    
    def __str__(self):
        return self.name

# 2. Social Links (GitHub, LinkedIn, Email, etc)
class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('email', 'Email'),
        ('twitter', 'Twitter'),
        ('instagram', 'Instagram'),
        ('other', 'Other'),
    ]
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    icon = models.CharField(max_length=50, blank=True)  # Font Awesome class or emoji
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.platform} - {self.url}"

# 3. Experience/Work History
class Experience(models.Model):
    job_title = models.CharField(max_length=200)  # e.g., "Product Developer"
    company = models.CharField(max_length=200)  # e.g., "AstraPay"
    location = models.CharField(max_length=200)  # e.g., "Jakarta, Indonesia"
    employment_type = models.CharField(max_length=50, blank=True)  # contract, internship, etc
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)  # Null if current job
    is_current = models.BooleanField(default=False)
    description = models.TextField()  # Main description
    achievements = models.JSONField(default=list, blank=True)  # List of bullet points
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-start_date']
    
    def __str__(self):
        return f"{self.job_title} at {self.company}"

# 4. Skills/Technologies
class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('languages', 'Languages'),
        ('programming', 'Programming Languages'),
        ('technology', 'Technology'),
        ('non_technical', 'Non-Technical'),
    ]
    
    PROFICIENCY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    
    name = models.CharField(max_length=100)  # e.g., "Next.js", "Supabase"
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES, default='intermediate')
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=7, default="#000000")  # Hex color for tag
    
    class Meta:
        ordering = ['category', '-proficiency', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.get_proficiency_display()})"

# 5. Projects/Products (Upgraded)
class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('website', 'Website'),
        ('mobile', 'Mobile App'),
        ('api', 'API/Backend'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)  # e.g., "LarisManis"
    subtitle = models.CharField(max_length=200, blank=True)  # e.g., "WEBSITE"
    description = models.TextField()
    detailed_description = models.TextField(blank=True)  # Longer description
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES, default='website')
    
    # Links
    live_demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    case_study_url = models.URLField(blank=True)
    
    # Media
    thumbnail = models.ImageField(upload_to='projects/', blank=True, null=True)
    
    # Tech Stack (Many-to-Many with Skill)
    technologies = models.ManyToManyField(Skill, related_name='projects', blank=True)
    
    # Features/Achievements (JSON array)
    features = models.JSONField(default=list, blank=True)  # List of bullet points
    
    # Metadata
    date_completed = models.DateField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-date_completed', 'order']
    
    def __str__(self):
        return self.title

# 6. Approach/Philosophy Section (Optional)
class Approach(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

# 7. Course & Training
class CourseTraining(models.Model):
    course_name = models.CharField(max_length=200)  # e.g., "Machine Learning Specialization"
    organization = models.CharField(max_length=200)  # e.g., "Coursera", "Udemy"
    date = models.DateField()  # Completion date
    description = models.TextField()  # Course description or what you learned
    image = models.ImageField(upload_to='courses/', blank=True, null=True)  # Course/activity photo
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-date']
        verbose_name = "Course & Training"
        verbose_name_plural = "Courses & Trainings"
    
    def __str__(self):
        return f"{self.course_name} - {self.organization}"

# 8. Certifications & Licenses
class Certification(models.Model):
    name = models.CharField(max_length=200)  # Certificate name
    image = models.ImageField(upload_to='certifications/')  # Certificate image
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"
    
    def __str__(self):
        return self.name