import assert from 'assert';
import { getTwitterData, twitterDataAggregator } from '../twitterDataCalculator.js';

const inputTestData = [
  {"text": "hello hOw arE You"},
  {"text": "ThIs IS quite the case"},
  {"text": "the a is to of at on"},
  {"text": "A full phrase, that ends. on A good   note"}
];

describe('getTwitterData(startTime, paginationToken', function() {
  it('should pull data for certik twitter', function() {
    getTwitterData(new Date("2021-03-01T23:50:00.000Z").toISOString(), "")
    .then(data => {
      assert(Array.isArray(data));
      assert(data.length > 0); 
    });
  });
});

describe('twitterDataAggregator(texts)', function() {
  it('should aggregate all text into one and return count of each word', function() {
    const res = twitterDataAggregator(inputTestData);
    assert(Array.isArray(res));
    assert(res.length === 2);
    const [allText, wordCount] = res;
    assert(typeof(allText), "string");

    const allTextOut = "hello hOw arE You ThIs IS quite the case the a is to of at on A full phrase, that ends. on A good   note ";
    const wordCountOut = {
      hello: 1,
      how: 1,
      are: 1,
      this: 1,
      quite: 1,
      case: 1,
      full: 1,
      phrase: 1,
      that: 1,
      ends: 1,
      good: 1,
      note: 1
    };

    assert.equal(allText, allTextOut);
    assert.deepEqual(wordCount, wordCountOut);
  });
});
