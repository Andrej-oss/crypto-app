import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useGetCryptoQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {
    data: cryptoList,
    isFetching
  } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [cryptoSearch, setCryptoSearchName] = useState('');
  useEffect(() => {
    const searchingCryptocurrency = cryptoList && cryptoList.data && cryptoList.data.coins.filter(coin => {
      return coin.name.toLowerCase().includes(cryptoSearch.toLowerCase());
    });
    setCryptos(searchingCryptocurrency);
  }, [cryptoList, cryptoSearch])
  if (isFetching) {
    return "Loading...";
  }
  console.log(cryptos);
  return (
      <div>
        { !simplified && <div className="search-crypto">
          <Input placeholder="cryptocurrency"
                 onChange={(e) => setCryptoSearchName(e.target.value)}/>
        </div>}
        <Row gutter={[32, 32]} className="crypto-card-container">
          {cryptos && cryptos.length && cryptos.map(crypto => (
              <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
                <Link to={`/crypto/${crypto.uuid}`}>
                  <Card title={`${crypto.rank}.${crypto.name}`}
                        extra={<img className="crypto-image" src={crypto.iconUrl}/>}
                        hoverable>
                    <p>Price: {millify(crypto.price)}</p>
                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                    <p>Daily change: {millify(`${crypto.change}`)}%</p>
                  </Card>
                </Link>
              </Col>
          ))}
        </Row>
      </div>
  );
};

export default Cryptocurrencies;