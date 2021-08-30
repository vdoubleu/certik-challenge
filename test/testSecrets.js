import assert from 'assert';
import secret from '../secrets.js';

describe('secrets', function() {
  it('should have each field filled in', function() {
    assert.notEqual(secret.Token, "");
  });
});
