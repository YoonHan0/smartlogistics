import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement } from "chart.js";

ChartJS.register(CategoryScale,LinearScale,BarController, BarElement);
const DayGraph = ({data}) => {
  let calculatedArr = [0,0,0,0,0,0,0,0]
  let rankColor = ["#11b288", "#207ac7", "#207ac7", "#207ac7", "#d6d6d6", "#d6d6d6", "#d6d6d6", "#d6d6d6"]

  const dates = data.map(item => item.date);
  const counts = data.map(item => item.count); 
  console.log(dates,counts)
  const data1 = {
      labels: dates,
      datasets: [
        {
          backgroundColor: rankColor,
          borderColor: rankColor,
          borderWidth: 1,
          hoverBackgroundColor: rankColor,
          hoverBorderColor: rankColor,
          data: counts
        }
      ]
    }; 
  const options = {
    legend: {
        display: false, // label 숨기기
    },
    scales: {
        yAxes: [{
            ticks: { 
                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                stepSize: 1, // 스케일에 대한 사용자 고정 정의 값
            }
        }]
    },
    maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
}
  return (
    <Box>
      <Bar data={data1} options={options} />
    </Box>
  );
};

export default DayGraph;