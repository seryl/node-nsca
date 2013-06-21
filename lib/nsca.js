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
      var config = {};
      config_path = path.resolve(config_path);
      if (fs.existsSync(config_path)) {
        data = fs.readFileSync(config_path);
        filter_data = function (line){
          return line[0] !== '#' && line !== '';
        };
        parse_config = function (configlist){
          var listlen = configlist.length;
          for(var i=0; i < listlen; i++){
            var mapping = configlist[i].split('=');
            config[mapping[0]] = mapping[1];
          };
        };
        parse_config(data.toString().split("\n").filter(filter_data));
        this.encryption = parseInt(config.encryption_method) || 0;
        this.password   = config.password                    || "";
      };
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
