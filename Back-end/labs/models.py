from django.db import models
from django.conf import settings
from django.db.models.deletion import CASCADE

User = settings.AUTH_USER_MODEL

class Lab(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lab_name = models.CharField(max_length=50)
    lab_description = models.TextField()

    def __str__(self):
        return self.lab_name

class LabDetail(models.Model):
    base_info = models.OneToOneField(Lab,on_delete=models.CASCADE)
    long_description = models.TextField()

class Milestone(models.Model):
    mile_relation = models.ForeignKey(Lab, on_delete=CASCADE, default="No relations")
    milestone = models.TextField()

class Resources(models.Model):
    res_relation = models.ForeignKey(Lab, on_delete=CASCADE, default="No relations")
    resource =  models.TextField()
