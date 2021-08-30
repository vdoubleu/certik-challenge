import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer, Label } from 'recharts';

const SentimentChart = (props) => {
  const data = props.data.pos ?
                [{name: "positive", value: props.data.pos}, 
                {name: "neutral", value: props.data.neu},
                {name: "negative", value: props.data.neg}]
              : [];

  const COLORS = ['#40B884', '#486A79', '#E1AA4C'];

  //console.log(props.data.pos);
  const nonNegPercent = Math.round((props.data.pos + props.data.neu) * 100) + "%";

  const responsiveAspect = props.viewSize > 1025 ? 1 : 3;

  const renderColorfulLegendText = (value: string, entry: any) => {
    const { color } = entry;

    return <span style={{ color }}>{value} - {Math.round(entry.payload.percent * 100)}%</span>;
  };

  function CustomLabel({cx, cy, viewBox, value1, value2}){
    return (
     <text x={cx} y={cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
        <tspan alignmentBaseline="middle" fontSize="26">{value1}</tspan>
        <tspan fontSize="14">{value2}</tspan>
     </text>
    )
  }

  return (
    <ResponsiveContainer width={"100%"} aspect={responsiveAspect} >
      <PieChart width='300' height='500'>
        <Pie 
          dataKey="value"
          data={data}
          innerRadius={responsiveAspect === 1 ? 80 : 55}
          outerRadius={responsiveAspect === 1 ? 140 : 100}
          fill="#82ca9d"
        >
          <Label position="centerTop" className='label font-bold text-2xl transform -translate-y-10'>
            {nonNegPercent}
          </Label>
          <Label position="center" className='label'>
            Non-Negative
          </Label>
          <Label position="centerBottom" className='label transform translate-y-7'>
            Recognition
          </Label>
          
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend formatter={renderColorfulLegendText} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SentimentChart;
