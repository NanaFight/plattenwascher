from machine import Pin
import ujson
import uos

from microWebSrv import MicroWebSrv

# start the Webserver
def start():
  print('Starting restful Webserver.')
  srv = MicroWebSrv(webPath='/gui')
  srv.Start(threaded=False)
