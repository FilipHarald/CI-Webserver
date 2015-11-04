#!/usr/local/bin/python2.7
# coding=utf-8
# -*- coding: utf-8 -*-
# Athour: Teddy Andersson.

#All imports for the project
from bottle import route, run, template, request, response, static_file, redirect
import bottle
import os
import json


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


@route('/', method='GET')
def main_page():
    os.system("echo 'hello world' >test.txt")
    return template('index')

@route('/', method='POST')
def main_page():
    print ('Git repo updated! The following message was received: \n' + json.load(request.body))
    print('\nNow trying to update to the latest version...')



#command for running the service local.    
#run(host='localhost', port=8080, debug=True, reloader=True)

#command for running the server 'global'
run(host='0.0.0.0', port=8080, debug=True, reloader=True)
