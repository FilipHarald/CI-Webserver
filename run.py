#!/usr/local/bin/python2.7
# coding=utf-8
# -*- coding: utf-8 -*-
# Athour: Teddy Andersson.

#All imports for the project
from bottle import route, run, template, request, response, static_file, redirect
import bottle
import subprocess
import json

latest_author = ""

@route('/', method='GET')
def main_page():
    command = subprocess.call(['git', 'status'])
    return template('index', latest_commit_by=latest_author)

@route('/', method='POST')
def main_page():
    print ('Git repo updated!! The following message was received:')
    print (json.load(request.body))
    payload_data = json.load(request.body)
    print('Updating latest commit by...')
    latestAuthor=payload_data.get('commits')[0].get('author').get('username')
    print (payload_data)
    print('\nNow trying to pull the latest version...')
    status = subprocess.call(['git', 'pull'])
    print('\nFinished pulling, status code:')
    print(status)


#command for running the service local.    
#run(host='localhost', port=8080, debug=True, reloader=True)

#command for running the server 'global'
run(host='0.0.0.0', port=8080, debug=True, reloader=True)

'''---------------------------- Code for Routes with static files -----------------------------'''

@route('/static/Css/<filename>')
def send_static(filename):
    return static_file(filename, root='./static/Css')


@route('/static/JS/<filename>')
def send_static(filename):
    return static_file(filename, root='./static/JS')


@route('/static/fonts/<filename>')
def send_static(filename):
    return static_file(filename, root='./static/Fonts')


@route('/static/images/<filename>')
def send_static(filename):
    return static_file(filename, root='./static/Images')

'''----------------------- Code for Routes --------------------------'''