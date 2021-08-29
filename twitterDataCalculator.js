import fetch from 'node-fetch';
import secret from './secrets.js';

export async function getTwitterData(startTime, paginationToken) {
  const pageTokenAddon = paginationToken ? "&pagination_token=" + paginationToken : "";
  const res = await fetch("https://api.twitter.com/2/users/1232319080637616128/tweets?max_results=100&tweet.fields=created_at,public_metrics&start_time=" + startTime + pageTokenAddon, {
    "method": "GET",
    "headers": {
      "cookie": "personalization_id=%22v1_somj3SUKJXfeb5%2FFXLdUvA%3D%3D%22; guest_id=v1%253A163010063479229710",
      "authorization": "Bearer " + secret.Token
    }
  });
  const data = await res.json();

  if (data.meta && data.meta.result_count === 100) 
    return data.data.concat(await getTwitterData(startTime, data.meta.next_token));
  else
    return data.data ? data.data : [];
}

export function twitterDataAggregator(texts) {
  let allText = "";
  const wordCount = {};
  for (let textInd = 0; textInd < texts.length; textInd++) {
    const text = texts[textInd].text;
    allText += text + " ";
    const words = text.split(/\s+/);
    for (let wordInd = 0; wordInd < words.length; wordInd++) {
      const word = words[wordInd].toLowerCase();

      const validStringRegExp = new RegExp(/(http)/, 'i');
      const boringWords = ["the", "a", "is", "to", "of", "at", "on", "you", "us"];
      if (!validStringRegExp.test(word) && !boringWords.includes(word)) {
        if (word in wordCount) {
          wordCount[word] += 1;
        } else {
          wordCount[word] = 1;
        }
      }
    }
  }

  return [allText, wordCount];
}
