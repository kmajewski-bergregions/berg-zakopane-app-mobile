import React, { useState, useEffect } from 'react';

import ReactApexChart from 'react-apexcharts';

const Chart = ({ weatherForecast }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    setWeather(weatherForecast);
  }, [weatherForecast]);

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#1979D4', '#1979D4'],
    markers: {
      size: 5,
    },
    stroke: {
      curve: 'smooth',
      width: 5,
      dashArray: [0, 5],
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: '#323232',
          fontSize: '16px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        },
        offsetY: 5,
      },
      axisBorder: {
        show: true,
        color: '#7e8d94',
        height: 1,
        width: '100%',
      },
    },
    yaxis: {
      tickAmount: 4,
      max: (value) => value + 1,
      min: (value) => value - 1,
      labels: {
        show: true,
        style: {
          colors: '#323232',
          fontSize: '16px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        },
        formatter: (value) => `${value.toFixed(0)}\xB0C`,
      },
      axisBorder: {
        show: true,
        color: '#7e8d94',
        height: '100%',
        width: 1,
      },
    },
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 14,
      },
    },
    noData: {
      text: 'Loading...',
    },
  };

  const temperature = weather?.map((item) => item.temperatureValue);
  const perceivedTemperature = weather?.map((item) => item.perceivedTemperatureValue);
  const hour = weather?.map((item) => item.hour);

  const series = [
    {
      name: 'Temperatura',
      data: [
        {
          x: `${hour[0]}:00`,
          y: temperature[0],
        },
        {
          x: `${hour[1]}:00`,
          y: temperature[1],
        },
        {
          x: `${hour[2]}:00`,
          y: temperature[2],
        },
        {
          x: `${hour[3]}:00`,
          y: temperature[3],
        },
        {
          x: `${hour[4]}:00`,
          y: temperature[4],
        },
        {
          x: `${hour[5]}:00`,
          y: temperature[5],
        },
        {
          x: `${hour[6]}:00`,
          y: temperature[6],
        },
        {
          x: `${hour[7]}:00`,
          y: temperature[7],
        },
        {
          x: `${hour[8]}:00`,
          y: temperature[8],
        },
        {
          x: `${hour[9]}:00`,
          y: temperature[9],
        },
        {
          x: `${hour[10]}:00`,
          y: temperature[10],
        },
      ],
    },
    {
      name: 'Temperatura odczuwalna',
      data: [
        {
          x: `${hour[0]}:00`,
          y: perceivedTemperature[0],
        },
        {
          x: `${hour[1]}:00`,
          y: perceivedTemperature[1],
        },
        {
          x: `${hour[2]}:00`,
          y: perceivedTemperature[2],
        },
        {
          x: `${hour[3]}:00`,
          y: perceivedTemperature[3],
        },
        {
          x: `${hour[4]}:00`,
          y: perceivedTemperature[4],
        },
        {
          x: `${hour[5]}:00`,
          y: perceivedTemperature[5],
        },
        {
          x: `${hour[6]}:00`,
          y: perceivedTemperature[6],
        },
        {
          x: `${hour[7]}:00`,
          y: perceivedTemperature[7],
        },
        {
          x: `${hour[8]}:00`,
          y: perceivedTemperature[8],
        },
        {
          x: `${hour[9]}:00`,
          y: perceivedTemperature[9],
        },
        {
          x: `${hour[10]}:00`,
          y: perceivedTemperature[10],
        },
      ],
    },
  ];

  return (
    <div style={{ width: '1500px', height: '250px', paddingRight: '50px' }} id="chart">
      <ReactApexChart options={options} series={series} type="area" width="100%" height="100%" />
    </div>
  );
};

export default Chart;
