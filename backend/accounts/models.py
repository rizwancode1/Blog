from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

class User(AbstractUser):
    username = models.CharField(max_length =255)
    email = models.EmailField(unique=True)
    USERNAME_FIELD= "email"
    REQUIRED_FIELDS = ['username']


    def __set__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE) # one user have one profile 
    full_name = models.CharField(max_length = 300)
    bio = models.CharField(max_length = 300)
    image = models.ImageField(default='default.jpg', upload_to='userimages')
    verified = models.BooleanField(default = False)

    def __set__(self):
        return self.full_name
    
def create_user_profile(sender, instance, created, *args, **kwargs):
    """
    A signal handler function that creates a profile for a newly created user.

    Parameters:
        sender (class): The model class sending the signal (User in this case).
        instance (object): The instance of the model class that was just saved.
        created (bool): Indicates whether a new instance was created or an existing one was updated.
        args (tuple): Additional positional arguments.
        kwargs (dict): Additional keyword arguments.
    """
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    """
    A signal handler function that saves the profile of a user.

    Parameters:
        sender (class): The model class sending the signal (User in this case).
        instance (object): The instance of the model class that was just saved.
        kwargs (dict): Additional keyword arguments.
    """
    instance.profile.save()

# Connect the create_user_profile signal to the post_save signal of User model
post_save.connect(create_user_profile, sender=User)
# Connect the save_user_profile signal to the post_save signal of User model
post_save.connect(save_user_profile, sender=User)

    

    
