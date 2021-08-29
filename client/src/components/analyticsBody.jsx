import React, { useEffect, useState } from 'react';
import SocialKeyWords from './tagCloud/tagCloud';
import getActivityData, { getEndDate } from './analysisDataCalculator';
import SentimentChart from './sentimentPieChart/sentimentChart';
import AccountActivity from './accountActivity/accountActivity';
import DropDown from './dropdown/dropDown';

const AnalyticsBody = () => {
  const [analysisData, setAnalysisData] = useState({cloud: [], sentiment: {}, metric: []});
  const [activityDisplayDuration, setActivityDisplayDuration] = useState("7 Day");
  const [activityDisplayBy, setActivityDisplayBy] = useState("Day");
  const [viewSize, setViewSize] = useState(document.documentElement.clientWidth);

  const accountActivityOptions = {
    "Month": ["3 Month", "4 Month", "6 Month"],
    "Week": ["7 Week", "10 Week", "12 Week"],
    "Day": ["7 Day", "14 Day", "30 Day"]
  }

  useEffect(() => {
    fetch("/data")
      .then(data => data.json())
      .then(data => { setAnalysisData(data); })
      .catch(err => console.error(err));

    function handleResize() {
      setViewSize(document.documentElement.clientWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  const activityData = getActivityData(analysisData.metric, activityDisplayBy, activityDisplayDuration);

  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-1 md:grid-rows-3"> 
      <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-2 md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1"> 
        <div className="mt-2 mb-4 h-10 flex items-center font-sans text-2xl font-medium">
          CertiK Sentiment Analysis
        </div>
        <div className="w-full bg-gray-100 flex items-center flex-col h-9/10">
          <div className="mb-10 ml-5 w-full font-sans text-gray-600 font-medium"> From {new Date().toDateString()} to {getEndDate(activityDisplayDuration).toDateString()} </div>
          <SentimentChart data={analysisData.sentiment} viewSize={viewSize} />
        </div>
      </div>
      <div className="lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-1 md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-1"> 
        <div className="my-2 h-10 grid grid-cols-2">
          <div className="flex items-center font-sans text-2xl font-medium">
            Twitter Account Activity
          </div>
          <div className="flex justify-end items-center">
            <DropDown 
              options={accountActivityOptions[activityDisplayBy]} 
              onClick={(option) => setActivityDisplayDuration(option)} 
              selected={activityDisplayDuration} 
            />
            <DropDown 
              options={Object.keys(accountActivityOptions)} 
              onClick={(option) => { 
                setActivityDisplayBy(option);
                setActivityDisplayDuration(accountActivityOptions[option][0]);
              }} 
              selected={activityDisplayBy}
            />
          </div>
        </div>
        <div className="h-9/10 bg-gray-100">
          <AccountActivity data={activityData} />
        </div>
      </div>
      <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-1 md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1">
        <div className="my-2 h-10 flex items-center font-sans text-2xl font-medium">
          Social Key Words aggregated by CertiK
        </div>
        <div className="h-8/10 bg-gray-100 rounded-sm flex ">
          <SocialKeyWords data={analysisData.cloud} viewSize={viewSize}/>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsBody;
