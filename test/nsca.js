var dgram = require('dgram');
var NSCA  = require('../lib/nsca');

describe('nsca', function() {
  it("should be able to read send_nsca configs", function(done) {
    var nsca = new NSCA("./fixtures/send_nsca.cfg");
    nsca.password.should.equal("myrandompassword");
    nsca.encryption.should.equal(1);
    done();
  });
});
