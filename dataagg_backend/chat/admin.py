from django.contrib import admin
from .models import *
from rest_framework.authtoken.admin import TokenAdmin

# TokenAdmin.raw_id_fields = ['user']

# Register your models here.
class ChatGroupAdmin(admin.ModelAdmin):
    """ enable Chart Group admin """
    list_display = ('id', 'name', 'description', 'icon', 'mute_notifications', 'date_created', 'date_modified')
    list_filter = ('id', 'name', 'description', 'icon', 'mute_notifications', 'date_created', 'date_modified')
    list_display_links = ('name',)

# Register your models here.
admin.site.register(Message)
admin.site.register(Conversation)
admin.site.register(Inbox)
admin.site.register(ChatGroup, ChatGroupAdmin)
