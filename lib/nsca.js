(function() {
  /**
   * Module dependencies.
   */

  var dgram  = require('dgram'),
      socket = require('dgram').createSocket('udp4'),
      path   = require('path'),
      fs     = require('fs');

  /**
   * The NSCA class.
   */

  var nsca = (function() {
    function nsca(config_path){
      this.password = "";
      this.encryption = 0;
      if (config_path) {
        this.read_config(config_path);
      }
    };

    /**
     * Reads send_nsca.cfg files and matches it's settings.
     * @param {String} config_path The send_nsca config path
     */

    nsca.prototype.read_config = function (config_path){
      config_path = path.resolve(config_path);
      console.log(config_path);
      fs.exists(config_path, function (exists){
        fs.readFile(config_path, function (err, data){
          if (err) throw err;
          console.log(data);
        });
      });
    };

    /**
     * Packs a message into a buffer to send.
     * @param {Object} message The message to send to the nsca
     */

    nsca.prototype.pack = function (message){

    };

    /**
     * Sends a packet buffer over UDP.
     * @param {String} (host) The target host
     * @param {Integer} (port) The target port
     * @param {Buffer} (packet) The packet buffer to send
     */

    nsca.prototype.send_packet = function (host, port, packet){
      socket.send(packet, 0, packet.length, port, host
        , function (err, bytes){
          if (err){
            console.log(err);
          }
        });
    };

    /**
     * Sends an NSCA packet over UDP.
     * @param {String} (host) The target host
     * @param {Integer} (port) The target port
     * @param {Object} (message) The message to send
     */

    nsca.prototype.send = function (host, port, message){
      var packet = this.pack(message);
      this.send_packet(host, port, packet);
    };

    /**
     * Closes the udp socket.
     */

    nsca.prototype.close = function (){
      socket.close();
    };

    return nsca;

  })();

  /**
   * Expose `nsca`.
   */

  module.exports = nsca;

}).call(this);
