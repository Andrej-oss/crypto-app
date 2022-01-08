import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { Col, Row, Select, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import { LineChart } from "./index";

const {
  Title,
  Text
} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  const {coinId} = useParams();
  const {
    data,
    isFetching
  } = useGetCryptoDetailsQuery(coinId);
  console.log(data);
  const cryptoDetails = data && data.data && data.data.coin;
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: coinHistory, isLoading } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod
  });
  console.log(coinId);
  if (isFetching || isLoading) return "Loading...";
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails && cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined/>
    },
    {
      title: 'Rank',
      value: cryptoDetails && cryptoDetails.rank,
      icon: <NumberOutlined/>
    },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails && cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`,
      icon: <ThunderboltOutlined/>
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails && cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined/>
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${cryptoDetails && cryptoDetails.allTimeHigh.price && millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined/>
    }
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails && cryptoDetails.numberOfMarkets,
      icon: <FundOutlined/>
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails && cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined/>
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails && cryptoDetails.supply.confirmed ? <CheckOutlined/> : <StopOutlined/>,
      icon: <ExclamationCircleOutlined/>
    },
    {
      title: 'Total Supply',
      value: `$ ${cryptoDetails && cryptoDetails.supply.total && millify(cryptoDetails.supply.total)}`,
      icon: <ExclamationCircleOutlined/>
    },
    {
      title: 'Circulating Supply',
      value: `$ ${cryptoDetails && cryptoDetails.supply.circulating && millify(cryptoDetails.supply.circulating)}`,
      icon: <ExclamationCircleOutlined/>
    }
  ];
  return (
      <div>
        <Col className="coin-detail-container">
          <Col className="coin-details-heading">
            <Title level={2} className="coin-name">
              {cryptoDetails && cryptoDetails.name} ({cryptoDetails && cryptoDetails.symbol}) Price
            </Title>
            <p>
              {cryptoDetails && cryptoDetails.name} live price in US dollars.
              View value statistic, market cap and supply.
            </p>
          </Col>
          <Select defaultValue="7d"
                  className="select-timeperiod"
                  placeholder="select time period"
                  onChange={(vale) => setTimePeriod(vale)}>
            {time.map((time, i) => <Option key={i} value={time}>{time}</Option>)}
          </Select>
          {cryptoDetails &&
              <LineChart coinHistory={coinHistory}
                         currentPrice={millify(cryptoDetails.price)}
                         coinName={cryptoDetails.name}/>}
          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails && cryptoDetails.name} Value Statistics
                </Title>
                <p>An overview showing the statistics of {cryptoDetails && cryptoDetails.name} </p>
              </Col>
              {stats.map(({title, value, icon}) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
                ))}
            </Col>
            <Col className="other-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails && cryptoDetails.name} Other Statistics
                </Title>
                <p>An overview showing the statistics of all cryptocurrencies </p>
              </Col>
              {genericStats.map(({title, value, icon}) => (
                  <Col className="coin-stats">
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
              ))}
            </Col>
          </Col>
          <Col className="coin-desc-link">
            <Row className="coin-desc">
              <Title level={3} className="coin-details-heading">
                What is {cryptoDetails && cryptoDetails.name}?
                {cryptoDetails && HTMLReactParser(cryptoDetails.description)}
              </Title>
            </Row>
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails && cryptoDetails.name} Links
              </Title>
              {cryptoDetails && cryptoDetails.links.map((link, i) => (
                  <Row key={i} className="coin-link">
                    <Title level={5} className="link-name">{link.type}</Title>
                    <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                  </Row>
              ))}
            </Col>
          </Col>
        </Col>
      </div>
  );
};

export default CryptoDetails;