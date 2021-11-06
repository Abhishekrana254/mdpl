from django.db import models

# Create your models here.

from django.contrib.auth.models import User
from django.contrib.auth.models import Group


class ChatGroup(Group):
    """ extend Group model to add extra info"""
    description = models.TextField(blank=True, help_text="description of the group")
    mute_notifications = models.BooleanField(default=False, help_text="disable notification if true")
    icon = models.ImageField(help_text="Group icon", blank=True, upload_to="chartgroup")
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('chat:room', args=[str(self.id)])

class Inbox(models.Model):
    id = models.CharField(max_length=32, primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Conversation(models.Model):
    id = models.CharField(max_length=32, primary_key=True)
    inbox_id = models.ForeignKey(Inbox, on_delete=models.CASCADE)
    user1 = models.CharField(max_length=32)
    user2 = models.CharField(max_length=32)

class Message(models.Model):
    id = models.CharField(max_length=32, primary_key=True)
    sender = models.CharField(max_length=32)
    reciever = models.CharField(max_length=32)
    timestamp = models.CharField(max_length=32)
    conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE)


'''
almost done
message - id, sender, reiever, timestamp, conv_id
conversation - id, user1, user2, inbox_id
inbox - id, user_id
'''
