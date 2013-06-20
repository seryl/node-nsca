(function() {
  /**
   * Module dependencies.
   */

  var dgram  = require('dgram'),
      socket = require('dgram').createSocket('udp4');

  /**
   * The NSCA class.
   */

  var nsca = (function() {
    function nsca(){}

    return nsca;

  })();

  /**
   * Expose `nsca`.
   */

  module.exports = nsca;

}).call(this);
