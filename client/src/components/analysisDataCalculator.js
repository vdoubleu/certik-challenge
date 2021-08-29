export default function getActivityData(allActivityData, activityDisplayBy, activityDisplayDuration) {
  const endDate = getEndDate(activityDisplayDuration);
  const activityPerDate = [];
  let currAmount = {retweets: 0, likes: 0, tweets: 0, date: "Today"};
  let currDate = new Date();
  let amountBack = 0;
  for (let i = 0; i < allActivityData.length; i++) {
    if (currDate < endDate) break;

    const currActivity = allActivityData[i];
    const parsedDate = new Date(currActivity.date);
    if (currDate >= parsedDate) {
      activityPerDate.push(currAmount)
      amountBack += 1;

      const nextName = calcNextName(activityDisplayBy, amountBack);

      if (parsedDate < endDate) {
        currAmount = {retweets: 0, likes: 0, tweets: 0, date: nextName};
      } else {
        currAmount = {retweets: currActivity.retweets, likes: currActivity.likes, tweets: 1, date: nextName};
      }

      switch (activityDisplayBy) {
        case "Day":
          currDate.setDate(currDate.getDate() - 1);
          break;
        case "Week":
          currDate.setDate(currDate.getDate() - 7);
          break;
        case "Month":
          currDate.setMonth(currDate.getMonth() - 1);
          break;
        default:
          throw Error("Unexpected displayBy type");
      }
    } else if (parsedDate >= endDate) {
      currAmount.retweets += currActivity.retweets;
      currAmount.likes += currActivity.likes;
      currAmount.tweets += 1;
    }
  }

  while (currDate >= endDate) {
    const nextName = calcNextName(activityDisplayBy, amountBack);
    amountBack += 1;
    activityPerDate.push({retweets: 0, likes: 0, tweets: 0, date: nextName});

    switch (activityDisplayBy) {
      case "Day":
        currDate.setDate(currDate.getDate() - 1);
        break;
      case "Week":
        currDate.setDate(currDate.getDate() - 7);
        break;
      case "Month":
        currDate.setMonth(currDate.getMonth() - 1);
        break;
      default:
        throw Error("Unexpected displayBy type");
    }
  }

  return activityPerDate.reverse();
}

export function getEndDate(activityDisplayDuration) {
  const endDate = new Date();
  switch (activityDisplayDuration) {
    case "7 Day":
      endDate.setDate(endDate.getDate() - 7);
      break;
    case "14 Day":
      endDate.setDate(endDate.getDate() - 14);
      break;
    case "30 Day":
      endDate.setDate(endDate.getDate() - 30);
      break;
    case "7 Week":
      endDate.setDate(endDate.getDate() - 7 * 7);
      break;
    case "10 Week":
      endDate.setDate(endDate.getDate() - 7 * 10);
      break;
    case "12 Week":
      endDate.setDate(endDate.getDate() - 7 * 12);
      break;
    case "3 Month":
      endDate.setMonth(endDate.getMonth() - 3);
      break;
    case "4 Month":
      endDate.setMonth(endDate.getMonth() - 4);
      break;
    case "6 Month":
      endDate.setMonth(endDate.getMonth() - 6);
      break;
    default:
      throw Error("Unexpected displayDuration type");
  }

  return endDate;
}

function calcNextName(activityDisplayBy, amountBack) {
  if (amountBack === 1) {
    switch (activityDisplayBy) {
      case "Day":
        return "Yesterday";
      case "Week":
        return "Last Week";
      case "Month":
        return "Last Month";
      default:
        throw Error("Unexpected displayBy type");
    }
  } else {
    switch (activityDisplayBy) {
      case "Day":
        return amountBack + "d ago";
      case "Week":
        return amountBack + "w ago";
      case "Month":
        return amountBack + "m ago";
      default:
        throw Error("Unexpected displayBy type");
    }
  }
}
