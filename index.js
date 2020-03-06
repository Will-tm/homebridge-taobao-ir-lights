var Service, Characteristic;
var SerialPort = require("serialport");

const on = Buffer.from("80a361115c82270256822d025c82280255822e025b8243023c822d025a82290254822c025d825a065b825906588259065d8258065c82580659825a065c825a065c8255065c8258065d82280258825a0659822a025f82240259822a025f8255065f82250259822a025e8254066082260257825c065a8259065b825a065c82280254825e065682369993a382085482", "hex")
const off = Buffer.from("7aa363115b82280256822e0259822a0254822c025d82260257822d0259822b025282310258825a065a825b06598258065d8259065b8256065c8259065d8258065c8256065b825a065b8256065f8255065f82240259822b025e82240258825a065c82270257822c025a82290257822d0258825a065b82590659825c065a8243023b825c065882349994a380085e82", "hex")

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory(
      "homebridge-taobao-ir-lights",
      "LightStrings",
      LightStrings
    );
}

function ttyWrite(path, data, callback) {
    var port = new SerialPort(path, {
        baudRate: 115200
    }).on('open', function() {
        port.write(data, function(err) {
            port.write(data, function(err) {
                port.write(data, function(err) {
                    port.close();
                    callback(err);
                });
            });
        });
    });
}

function LightStrings(log, config) {
    this.log = log;

    this.path = config["path"];
    this.name = config["name"] || "LightStrings";
    this.manufacturer = config["manufacturer"] || "";
    this.model = config["model"] || "Model not available";
    this.serial = config["serial"] || "Non-defined serial";

    this.active = false;
}

LightStrings.prototype = {

    setState: function(value, callback) {
        var self = this;
        ttyWrite(self.path, value?on:off, function(err) {
            self.active = value;
            self.log("'%s' is now %s", self.name, value ? "on" : "off");
            callback(err);
        });
    },

    getState: function (callback) {
        var self = this;
        self.log("'%s' is currently %s", self.name, self.active ? "on" : "off");
        callback(undefined, self.active);
    },

    identify: function (callback) {
        callback();
    },

    getServices: function () {
        var service = new Service.AccessoryInformation();
        service.setCharacteristic(Characteristic.Name, this.name)
               .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
               .setCharacteristic(Characteristic.Model, this.model);

        var lightService = new Service.Lightbulb(this.name);
        lightService.getCharacteristic(Characteristic.On)
                     .on('set', this.setState.bind(this))
                     .on('get', this.getState.bind(this));

        return [service, lightService];
    }
};
