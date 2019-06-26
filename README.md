# plattenwascher-firmware

## reqirements:

* git
* python >= 3.7
* nodejs >= 12.x.x
* pipenv 

create a file called 'src/firmware/wlan.json' of the following form 
```json
{
    "ssid": "your_ssid",
    "password": "your_password"
}
```
there is also an example file called 'src/firmware/wlan.json.example'

```shell
$ pipenv install
```

```shell
$ pipenv shell
```

```shell
$ npm install
```

download the latest build of micropython from http://micropython.org/download#esp32 into the 'vendors' directory

# flash your ESP32 with micropython

This step must be done only once.

* {port} - the port your microntroller is connected to
* {micropython.bin} - the micropython firmware you downloaded

```console
$ esptool --chip esp32 --port {port} erase_flash
$ esptool --chip esp32 --port {port} write_flash -z 0x1000 {micropython.bin}
```

```shell
$ npm run build
```

activate rshell on COM3
```console
$ rshell --buffer-size=30 --port {port}
```
copy source files to the ESP32
```console
$ cp -r ./build/* /pyboard
```

## activate repl
```console
$ repl
```
