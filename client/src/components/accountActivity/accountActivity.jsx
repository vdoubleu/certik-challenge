import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const AccountActivity = (props) => {
  const data = props.data;
  const responsiveAspect = props.viewSize > 1024 ? 3 : 2.5;

  return (
    <ResponsiveContainer width="100%" aspect={responsiveAspect}>
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="retweets" stroke="#6B7D95" />
        <Line type="monotone" dataKey="likes" stroke="#6EC8A1" />
        <Line type="monotone" dataKey="tweets" stroke="#E2AF57" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default AccountActivity;
