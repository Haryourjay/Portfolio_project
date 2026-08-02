from django.contrib.auth.models import AbstractUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models, transaction
import uuid
from django.utils import timezone 

class UserManager(BaseUserManager):
    @transaction.atomic
    def create_user(
            self, 
            email: str, 
            first_name: str, 
            last_name: str, 
            phone: str, 
            password: str=None,
            **extra_fields
        ):
 
        if not email:
            raise ValueError('The Email must be set')
        if not first_name:
            raise ValueError('The First Name must be set')
        if not last_name:
            raise ValueError('The Last Name must be set')
        if not phone:
            raise ValueError('The Phone must be set')
        
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    @transaction.atomic
    def create_superuser(
        self, 
            email: str, 
            first_name: str, 
            last_name: str, 
            phone: str, 
            password: str=None, 
            **extra_fields
        ):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')


        user = self.create_user(email, first_name, last_name, phone, password, **extra_fields)
        
        return user
    
    @transaction.atomic
    def create_staffuser(
        self, 
            email: str, 
            first_name: str, 
            last_name: str, 
            phone: str, 
            password: str=None, 
            **extra_fields
        ):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is True:
            raise ValueError('Staff user must have is_staff=False.')
        if extra_fields.get('is_superuser') is True:
            raise ValueError('Staff user must have is_superuser=False.')


        user = self.create_user(email, first_name, last_name, phone, password, **extra_fields)
        
        return user

  
   
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None  # Remove the username field
    email = models.EmailField(max_length=100, unique=True)
    phone = PhoneNumberField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']

    objects = UserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class PortfolioVideo(models.Model):
    CATEGORY_CHOICES = (
        ('youtube', 'Youtube'),
        ('short_reels', 'Shorts / Reels'),
        ('dtc_ugc', 'DTC / UGC'),
        ('ads', 'Ads'),
        ('live_action', 'Live Action'),
        ('motion_design', 'Motion Design'),
        ('movies', 'Movies'),
        ('reel', 'Reel'),
    )
    url = models.URLField()
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    description = models.TextField(null=True, blank=True)
    is_reel = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.is_reel:
            PortfolioVideo.objects.filter(is_reel=True).update(is_reel=False)
        super().save(*args, **kwargs)

class ShowcaseVideo(models.Model):
    video = models.ForeignKey(PortfolioVideo, on_delete=models.CASCADE, related_name='showcase_video')
    service_type = models.CharField(max_length=100, null=True, blank=True)
    tags = models.JSONField(default=list, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
            return f'{self.video.url} - ({self.service_type})'

class Email(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    service_type = models.CharField(max_length=100, null=True, blank=True)
    project_brief = models.TextField()
    sent = models.BooleanField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

