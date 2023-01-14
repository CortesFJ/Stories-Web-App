from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    STUDENT = 1
    PROFESSOR = 2
    EDITOR = 3

    ROLE_CHOICES = (
        (EDITOR, 'Editor'),
        (STUDENT, 'Student'),
        (PROFESSOR, 'Professor'),
    )
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=True, null=True)