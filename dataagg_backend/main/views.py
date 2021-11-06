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


# search in data
@api_view(('GET', 'POST'))
@csrf_exempt
def search(request):
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


# getting description page
@api_view(('GET', 'POST'))
@csrf_exempt
def get_description_page(request):
    '''
    For Getting Subjects of a class
    '''
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)
    print('req', req)

    # req['username'] = 'user'
    # req['id'] = '4'
    # try:
    obj = CustomerRequest.objects.get(data_id=req['id'], username=req['username'])
    download_data_status = model_to_dict(obj)['download_data_status']
    # except Exception as e:
    #     print(e)
    #     download_data_status = False

    return Response({
        'message': 'success',
        'download_data_status': download_data_status
    })


# save call request
@api_view(('GET','POST'))
# @renderer_classes([JSONRenderer])
@csrf_exempt
def save_call_request(request):
    '''
    For Getting Subjects of a class
    '''
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)

    print('req', req)

    '''
    save the record in CustomerRequest
    '''
    data = {
        'username': req['username'],
        'data_id': req['data_id'],
        'message': 'test',
        'phone': req['phoneNumber'],
        'email': req['email'],
        'download_data_status': 'False'
    }
    CustomerRequest.objects.create(**data)
    return Response({
        'message': 'success',
    })


# downlaod data
@api_view(('GET', 'POST'))
@csrf_exempt
def download_data(request):
    '''
    For Getting Subjects of a class
    '''
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)
    print('req', req)
    file_name = req['file_name']
    file_path = '/home/abhishek/Desktop/DataAgg/dataagg_backend/data/' + file_name

    try:
        with open(file_path, 'rb') as tmp:

            if 'xls' in file_name:
                resp = HttpResponse(tmp, content_type='application/vnd.ms-excel;charset=UTF-8')
            else:
                resp = HttpResponse(tmp, content_type='application/text;charset=UTF-8')

            resp['Content-Disposition'] = "attachment; filename=%s" % file_name

        print('Downloading file')

        return resp
    except:
        return ''

# getting customer requests
@api_view(('GET', 'POST'))
@csrf_exempt
def get_customer_requests(request):
    '''
    For Getting Subjects of a class
    '''
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)

    print('req', req)

    try:
        class_obj = Class.objects.get(name=req['class_name'])
        subject_list = model_to_dict(class_obj)['subject_list']
        subject_list = subject_list.split(',')
    except:
        subject_list = []



    return Response({
        'message': 'success',
        'subject_list': subject_list
    })


# getting download rights
@api_view(('GET', 'POST'))
@csrf_exempt
def approve_download_rights(request):
    '''
    For Getting Subjects of a class
    '''
    body_unicode = request.body.decode('utf-8')
    req = json.loads(body_unicode)

    print('req', req)

    try:
        class_obj = Class.objects.get(name=req['class_name'])
        subject_list = model_to_dict(class_obj)['subject_list']
        subject_list = subject_list.split(',')
    except:
        subject_list = []



    return Response({
        'message': 'success',
        'subject_list': subject_list
    })

# getting list of subjects - input class_name
@api_view(('GET', 'POST'))
@csrf_exempt
def upload_data(request):
    print('req', request.data)
    cover = request.data['cover']
    title = request.data['title']
    # subject_name = 'Maths'
    data = {
        'cover': request.data['cover'],
        'category': request.data['category'],
        'name': request.data['name'],
        'description': request.data['description'],
        'company': request.data['company'],
        'file_name': request.data['file_name'],
    }

    print('cover', cover)
    # Video.objects.create(title=title, cover=cover)
    Data.objects.create(**data)

    import time
    # time.sleep(4)

    from shutil import copyfile
    src = os.environ['BASE_DIR'] + 'media/videos/' + str(cover)

    # dont copy this instead take this path in the UI also
    dst = os.environ['UI_PATH'] + 'src/assets/videos/' + str(cover)
    copyfile(src, dst)

    del data['cover']
    return HttpResponse({'message': 'Data uploaded', 'data': data}, status=200)
