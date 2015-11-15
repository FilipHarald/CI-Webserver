#!/usr/local/bin/python2.7
# coding=utf-8
# -*- coding: utf-8 -*-
# Athour: Teddy Andersson.

#All imports for the project
from bottle import route, run, template, request, response, static_file, redirect
import bottle
import subprocess
import json
from AuthorName import AuthorName


@route('/jonas/box', method='GET')
def jonas_box_page():
    return template('jonas/box')

@route('/jonas/box', method='GET')
def jonas_box_page():
    return template('jonas/box')


@route('/jonas/spotifySearch', method='GET')
def jonas_spotify_page():
    return template('jonas/spotifySearch')


@route('/jonas/game', method='GET')
def jonas_game_page():
    return template('jonas/game')


@route('/jonas/facebookComment', method='GET')
def jonas_facebook_page():
    return template('jonas/facebookcomment')


@route('/jonas', method='GET')
def jonas_page():
    return template('jonas/index')


@route('/', method='GET')
def main_page():
    command = subprocess.call(['git', 'status'])
    print(AuthorName.latest_author)
    return template('index', latest_commit_by=AuthorName.latest_author)


#This method is called by the GitHub webhook
@route('/', method='POST')
def main_page():
    print('Git repo updated!! The following message was received:')
    test_dict = request.json
    print(test_dict)
    print('Updating latest commit by to: ' + AuthorName.latest_author)
    AuthorName.set_name(test_dict.get('commits')[0].get('author').get('username'))
    print('\nNow trying to pull the latest version...')
    status = subprocess.call(['git', 'pull'])
    print('\nFinished pulling, status code:')
    print(status)


'''---------------------------- Code for Routes with static files -----------------------------'''

@route('/static/Css/<filepath:path>')
def send_static(filepath):
    return static_file(filepath, root='./static/Css')


@route('/static/JS/<filepath:path>')
def send_static(filepath):
    return static_file(filepath, root='./static/JS')


@route('/static/fonts/<filepath:path>')
def send_static(filepath):
    return static_file(filepath, root='./static/Fonts')


@route('/static/images/<filepath:path>')
def send_static(filepath):
    return static_file(filepath, root='./static/Images')

'''----------------------- Code for Routes --------------------------'''


#command for running the service local.    
#run(host='localhost', port=8086, debug=True, reloader=True)

#command for running the server 'global'
run(host='0.0.0.0', port=80, debug=True, reloader=True)

