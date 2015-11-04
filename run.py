#!/usr/local/bin/python2.7
# coding=utf-8
# -*- coding: utf-8 -*-
# Athour: Teddy Andersson.

#All imports for the project
from bottle import route, run, template, request, response, static_file, redirect
import bottle
import os
import requests
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
    return template('index')


#command for running the service local.    
run(host='localhost', port=8080, debug=True, reloader=True)

#command for running the server 'global'
#run(host='0.0.0.0', port=8080, debug=True, reloader=True)
