from django.shortcuts import render

from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import *

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse

from django.contrib.auth import authenticate

import json
import copy

from django.forms.models import model_to_dict
from django.db.models import Q



from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse
from asgiref.sync import sync_to_async
from tortoise import Tortoise
from django.conf import settings

# Create your views here.

# chat/views.py
from django.shortcuts import render
from .models import ChatGroup
from .tortoise_models import ChatMessage


'''
- open and maintain chat connection
send message:
    - using chat connection

recieve notification

services - done 
consumers
views - done
models - done
tortoise_models -
urls


'''


# getting list of subjects - input class_name
@api_view(('GET', 'POST'))
@csrf_exempt
def send_message(request):
    '''
    For Getting Subjects of a class
    '''
    # req = request.query_params
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)


    print('req', req)
    query = req['query']
    # query = ''
    # try:
    # print('a'+ query + 'a')
    if query != '':
        lookups= Q(name__icontains=query) | Q(description__icontains=query)
        data_list= DataInfo.objects.filter(lookups) # .distinct()
        data_list = [ model_to_dict(ele) for ele in data_list]
    else:
        data_list = []
    # except:
    #     data_list = []

    print('data', data_list)

    return Response({
        'message': 'success',
        'data_list': data_list
    })

# getting list of conversations
@api_view(('GET', 'POST'))
@csrf_exempt
def get_inbox(request):
    '''
    For Getting Subjects of a class
    '''
    # req = request.query_params
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)


    print('req', req)
    query = req['query']
    # query = ''
    # try:
    # print('a'+ query + 'a')
    if query != '':
        lookups= Q(name__icontains=query) | Q(description__icontains=query)
        data_list= DataInfo.objects.filter(lookups) # .distinct()
        data_list = [ model_to_dict(ele) for ele in data_list]
    else:
        data_list = []
    # except:
    #     data_list = []

    print('data', data_list)

    return Response({
        'message': 'success',
        'data_list': data_list
    })

# getting list of messages - input user1, user2
@api_view(('GET', 'POST'))
@csrf_exempt
def get_conversation(request):
    '''
    For Getting conversations with a person
    '''
    # req = request.query_params
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)


    print('req', req)
    query = req['query']
    # query = ''
    # try:
    # print('a'+ query + 'a')
    if query != '':
        lookups= Q(name__icontains=query) | Q(description__icontains=query)
        data_list= DataInfo.objects.filter(lookups) # .distinct()
        data_list = [ model_to_dict(ele) for ele in data_list]
    else:
        data_list = []
    # except:
    #     data_list = []


    # here somethign i have to do to make the conenction running with the UI and this url in server
    # and this url should keep checking for any new messages every 5 seconds and then
    # how to get notification when not in chat conversation UI - conversation connection should be open for all the conversations
    # when logout/go offline close the connection - check for user going offline in profile status api for that always update
                # one api server for closing the connections all the time



    print('data', data_list)

    return Response({
        'message': 'success',
        'data_list': data_list
    })


def index(request):
    return render(request, 'chat/index.html', {})

def get_participants(group_id=None, group_obj=None, user=None):
    """ function to get all participants that belong the specific group """

    if group_id:
        chatgroup = ChatGroup.objects.get(id=id)
    else:
        chatgroup = group_obj

    temp_participants = []
    for participants in chatgroup.user_set.values_list('username', flat=True):
        if participants != user:
            temp_participants.append(participants.title())
    temp_participants.append('You')
    return ', '.join(temp_participants)


@login_required
def room(request, group_id):
    if request.user.groups.filter(id=group_id).exists():
        chatgroup = ChatGroup.objects.get(id=group_id)
        #TODO: make sure user assigned to existing group
        assigned_groups = list(request.user.groups.values_list('id', flat=True))
        groups_participated = ChatGroup.objects.filter(id__in=assigned_groups)
        return render(request, 'chat/room.html', {
            'chatgroup': chatgroup,
            'participants': get_participants(group_obj=chatgroup, user=request.user.username),
            'groups_participated': groups_participated
        })
    else:
        return HttpResponseRedirect(reverse("chat:unauthorized"))

@login_required
def unauthorized(request):
    return render(request, 'chat/unauthorized.html', {})


async def history(request, room_id):

    await Tortoise.init(**settings.TORTOISE_INIT)
    chat_message = await ChatMessage.filter(room_id=room_id).order_by('date_created').values()
    await Tortoise.close_connections()

    return await sync_to_async(JsonResponse)(chat_message, safe=False)
