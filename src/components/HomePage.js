import React from 'react';
import millify from "millify";
import { Row, Col,  Typography, Statistic, } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptoQuery } from "../services/cryptoApi";

const HomePage = () => {
  const { data, isFetching } = useGetCryptoQuery();
  const globalStats = data && data.data && data.data.stats;
  if (isFetching) return "Loading...";
  console.log(data);
  return (
      <div>
        <Typography.Title level={2} className="heading">Global Crypto Stats</Typography.Title>
        <Row>
          <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
          <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
          <Col span={12}><Statistic title="Total Market Cap" value={globalStats.totalMarketCup}/></Col>
          <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
          <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
        </Row>
      </div>
  );
};

export default HomePage;