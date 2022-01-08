import { Col, Row, Typography } from "antd";
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({
                     coinHistory,
                     currentPrice = 0,
                     coinName = ''
                   }) => {
  const coinPrice = [];
  const timeStamp = [];
  if (coinHistory) {
    for (const historyElement of coinHistory.data.history) {
      coinPrice.push(historyElement.price);
      timeStamp.push(new Date(historyElement.timestamp * 1000).toLocaleDateString());
    }
  }
  const chartData = {
    labels: timeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
  console.log(coinHistory);
  return (
      <div>
        <Row className="chart-header">
          <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
          <Col className="price-container">
            <Typography.Title level={5} className="price-change">
              {coinHistory && coinHistory.data.change}%
            </Typography.Title>
            <Typography.Title level={5} className="current-price">
              Current {coinName} price {currentPrice}$
            </Typography.Title>
          </Col>
        </Row>
        <Line data={chartData} options={options} type="line"/>
      </div>
  );
};

export default LineChart;