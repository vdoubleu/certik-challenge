import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const SentimentChart = (props) => {
  const data = props.data.pos ?
                [{name: "positive", value: props.data.pos}, 
                {name: "negative", value: props.data.neg}, 
                {name: "neutral", value: props.data.neu}]
              : [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const responsiveAspect = props.viewSize > 1025 ? 1 : 3;

  return (
    <ResponsiveContainer width={"100%"} aspect={responsiveAspect} >
      <PieChart width='300' height='500'>
        <Pie 
          dataKey="value"
          data={data}
          innerRadius={responsiveAspect === 1 ? 80 : 45}
          outerRadius={responsiveAspect === 1 ? 140 : 90}
          fill="#82ca9d"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SentimentChart;
