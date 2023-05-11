import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateGraph = ({ inquiry }) => {
  const [graph, setGraph] = useState('day');
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const dateArray = data
    .filter(data => data.state === 'RV')
    .map(data => data.date);

  const RVcountArray = data
    .filter(dt => dt.state === 'RV')
    .map(dt => dt.count);

  const IScountArray = data
    .filter(dt => dt.state === 'IS')
    .map(dt => dt.count);

  const sum = (arr) => {
    const a = arr.reduce((total, num) => total + num, 0);
    console.log(a);
    return a;
  }

  const [selectedBar, setSelectedBar] = useState([sum(IScountArray), sum(RVcountArray)]);
  // 현재 날짜 설정 value 만큼 계산
  const settingStartdate = (graph, value) => {
    const currentDate = new Date();
    
    if (graph === 'day') {
      currentDate.setDate(currentDate.getDate() - 7 + value);
    }

    if (graph === 'month') {
      currentDate.setMonth(currentDate.getMonth() - 11 + value);
    }
    if (graph === 'year') {
      currentDate.setYear(currentDate.getFullYear() - 5 + value);
    }
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [startdate, setStartDate] = useState(settingStartdate('day', 0));

  // DatePicker의 값을 저장하는 메소드
  const settingdate = (value) => {
    if (graph === 'day') {
      value.add(-7, 'day').format();
    }

    if (graph === 'month') {
      value.add(-12, 'month').format();
    }
    if (graph === 'year') {
      value.add(-5, 'year').format();
    }
    const year = value.get('year');
    const month = String(value.get('month') + 1).padStart(2, '0');
    const day = String(value.get('date')).padStart(2, '0');
    console.log(year, month, day)
    return `${year}-${month}-${day}`;
  }

  // 그래프를 그리기 위해 데이터 값을 받아오는 메소드
  const showGraph = async (startDate) => {
    const data = {
      state: graph
    }
    try {
      const response = await fetch(`/api/inquiry/graph?state=${graph}&startDate=${startDate}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: localStorage.getItem("token"),
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      console.log(json.data);
      setData(json.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  //click 시 7일 기준으로 그래프를 보여주는 메소드
  const handleClickDay = (e) => {
    setGraph('day');
    setValue(0);
    setStartDate(settingStartdate('day', value));
    showGraph(startdate);
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  }

  //click 시 달 기준으로 12달의 그래프를 보여주는 메소드
  const handleClickMonth = (e) => {
    setGraph('month');
    setValue(0);
    setStartDate(settingStartdate('month', value));
    showGraph(startdate);
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  }

  //click 시 년 기준으로 5년의 그래프를 보여주는 메소드
  const handleClickYear = (e) => {
    setGraph('year');
    setValue(0);
    setStartDate(settingStartdate('year'), value);
    showGraph(startdate);
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  }

  // 그래프의 바를 클릭 시 Doughnut의 그래프가 보여지는 메소드
  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const RVcount = RVcountArray[clickedIndex];
      const IScount = IScountArray[clickedIndex];

      const selectedData = [IScount, RVcount];
      setSelectedBar(selectedData);
    }
  };

  useEffect(() => {
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  },[data]);

  useEffect(() => {
    showGraph(settingStartdate(graph, value));
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  }, [graph, value]);

  const handleChangeDate = (value) => {
    showGraph(settingdate(value))
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  };

  const data1 = {
    labels: dateArray,
    datasets: [
      {
        label: '입고',
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 0.4)",
        data: RVcountArray
      },
      {
        label: '출고',
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
        hoverBorderColor: "rgba(54, 162, 235, 0.4)",
        data: IScountArray
      }
    ]
  };

  const options = {
    legend: {
      display: true, // label 숨기기
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
          stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
          max: 1000000
        },
        gridLines: {
          lineWidth: 0 //y축 격자선 없애기
        }
      }]
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    onClick: handleBarClick
  }

  const data2 = {
    // labels:['출고','입고'],
    datasets: [{
      data: selectedBar,
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)'

      ],
      hoverOffset: 4
    }]
  };

  const options2 = {
    type: 'doughnut',
    data: data,
  };

  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center'
        }}>
        <Button
          sx={{
            background: graph === 'day' ? '#0671F7' : '#fff',
            borderRadius: '20px 0 0 20px',
          }}
          onClick={handleClickDay}>
          <Box sx={{ color: graph === 'day' ? '#fff' : '#000' }}>
            <strong>일</strong>
          </Box>
        </Button>

        <Button
          sx={{
            ml: 1,
            mr: 1,
            background: graph === 'month' ? '#0671F7' : '#fff',
            borderRadius: '0'
          }}
          onClick={handleClickMonth}>
          <Box sx={{ color: graph === 'month' ? '#fff' : '#000' }}>
            <strong>월</strong>
          </Box></Button>

        <Button
          sx={{
            background: graph === 'year' ? '#0671F7' : '#fff',
            borderRadius: '0 20px 20px 0'
          }}
          onClick={handleClickYear}>
          <Box sx={{ color: graph === 'year' ? '#fff' : '#000' }}>
            <strong>년</strong>
          </Box></Button>
      </Box>
      <Box
        sx={{
          m: 5,
          height: inquiry ? '450px' : null,
          display: 'flex', // 가로 정렬을 위해 flex 속성 추가
          justifyContent: 'space-between' // 요소 사이의 간격을 동일하게 설정
        }}>
        <Box sx={{
          width: '70%'
        }}>
          <Bar data={data1} options={options} />
        </Box>
        <Box
          sx={{
            m: 3
          }}>
          <Doughnut data={data2} options={options} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <Button onClick={() => setValue(value - 1)}><ChevronLeftIcon /></Button>
        <Box sx={{
          display: 'flex',
        }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={dayjs(dateArray[dateArray.length - 1])} onChange={handleChangeDate} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button onClick={() => setValue(value + 1)}><ChevronRightIcon /></Button>
      </Box>
    </Box>
  );
};

export default DateGraph;