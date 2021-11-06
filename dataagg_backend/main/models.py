from django.db import models

# Create your models here.

# from django.contrib.auth.models import User


class DataInfo(models.Model):
    id = models.CharField(max_length=32, primary_key=True)
    category = models.CharField(max_length=32)
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=32)
    company = models.CharField(max_length=32, default='')
    file_name = models.CharField(max_length=32, default='')


class CustomerRequest(models.Model):
    username = models.CharField(max_length=32)
    data_id = models.CharField(max_length=32)
    message = models.CharField(max_length=32)
    phone = models.CharField(max_length=32)
    email = models.CharField(max_length=32)
    download_data_status = models.CharField(max_length=32)
