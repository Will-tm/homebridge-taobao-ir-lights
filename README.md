# homebridge-taobao-ir-lights

homebridge-plugin for some cheap chinese light string coming infrared remote control

#Installation
Follow the instruction in [NPM](https://www.npmjs.com/package/homebridge) for the homebridge server
installation. The plugin is published through [NPM](https://www.npmjs.com/package/homebridge-taobao-ir-lights) and
should be installed "globally" by typing:

    sudo npm install -g homebridge-taobao-ir-lights

#Configuration

config.json

Example:

    {
      "bridge": {
          "name": "Homebridge",
          "username": "CC:22:3D:E3:CE:51",
          "port": 51826,
          "pin": "031-45-154"
      },
      "description": "This is an example configuration file for homebridge ir lights plugin",
      "hint": "Always paste into jsonlint.com validation page before starting your homebridge, saves a lot of frustration",
      "accessories": [
        {
            "accessory": "LightStrings",
            "name": "Ligh tStrings",
            "path": "/dev/ttyUSB0"
        }
     ]
    }
