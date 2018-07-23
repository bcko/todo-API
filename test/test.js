const assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1,2,3].indexOf(4), -1);
      });
    });
  });

/*
const request = require('request');

const endpoint = 'http://localhost:3000/api/v1/noteItems';

describe('noteItems', function() {
    it('should return 200 response code', function (done) {
        request.get(endpoint, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it();

});
*/