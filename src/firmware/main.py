import network
import server
import ujson

# read the wlan credentials from 'wlan.json'
f = open('wlan.json')
wlan = ujson.loads(f.read())
f.close()

# Connect to the WiFi Network
station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(wlan['ssid'], wlan['password'])

# Start the Server
server.start()
