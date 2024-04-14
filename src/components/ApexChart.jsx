import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import data from '../assets/data.json';
import './style.css'

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Exchange Rate Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        title: {
          text: 'Exchange Rate'
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
      }
    }
  });
  const [activeCurrency, setActiveCurrency] = useState('EUR');

  const updateChartData = (currency) => {
    const currencyData = data.timestamps.map((timestamp, index) => {
      return [timestamp, data.targetCurrency[currency][index]];
    });
    setChartData(prev => ({
      ...prev,
      series: [{
        data: currencyData
      }]
    }));
  };

  useEffect(() => {
    if (data) {
      updateChartData(activeCurrency);
    }
  }, [activeCurrency]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={600} />
      </div>
      <div className='buttons'>
        <button className={activeCurrency === 'EUR' ? 'active' : ''} onClick={() => setActiveCurrency('EUR')}>EUR</button>
        <button className={activeCurrency === 'RUB' ? 'active' : ''} onClick={() => setActiveCurrency('RUB')}>RUB</button>
        <button className={activeCurrency === 'UZS' ? 'active' : ''} onClick={() => setActiveCurrency('UZS')}>UZS</button>
      </div>
    </div>
  );
};

export default ApexChart;
