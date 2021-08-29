import express from 'express';
import {fileURLToPath} from 'url'
import path, { dirname } from 'path';
import mcache from 'memory-cache';
import { Heap } from 'heap-js';
import vader from 'vader-sentiment';
import { getTwitterData, twitterDataAggregator } from './twitterDataCalculator.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("client/public"));

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }
      next();
    }
  }
}

app.get('/data', cache(10), (req, res) => {
  async function getDisplayData() {
    const date6MonthsAgo = new Date();
    date6MonthsAgo.setMonth(date6MonthsAgo.getMonth() - 3);
    // stop at 6 months ago since that's the max amount of time we'll need to look back
    // for the twitter activity chart
    getTwitterData(date6MonthsAgo.toISOString())
    .then(texts => {
      const returnSize = 30;
      const [allText, wordCount] = twitterDataAggregator(texts);

      const wordFreqComp = (a, b) => {
        if (a.count > b.count)
          return 1;
        else if (a.count < b.count)
          return -1;
        else 
          return 0;
      }
      // use a heap to efficiently get most popular 30 words
      const heap = new Heap(wordFreqComp);
      for (const word in wordCount) {
        const val = {value: word, count: wordCount[word]};
        if (heap.length >= returnSize) {
          heap.pushpop(val);
        } else {
          heap.push(val);
        }
      }

      // multiply by 10 to make differences in quantity more visible
      const cloudData = heap.toArray().map(d => ({value: d.value, count: d.count * 10}));

      const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(allText);

      const metricData = texts.map(t => 
        ({
          "retweets": t.public_metrics.retweet_count, 
          "likes": t.public_metrics.like_count, 
          "date": t.created_at
        })
      );

      const out = {cloud: cloudData, sentiment: intensity, metric: metricData};
      res.send(out);
    });
  }
  getDisplayData();
}); 
