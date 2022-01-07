import moment from "moment";
import React, { useState } from 'react';
import { Select, Typography, Col, Row, Card, Avatar } from "antd";
import { useGetCryptoQuery } from "../services/cryptoApi";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import demoImage from "../../public/images/news.jpg";

const NewsPage = ({simplified}) => {
  const { Title, Text } = Typography;
  const { Option } = Select;
  const count = simplified ? 6 : 12;
  const [ newsCategory, setNewsCategory ] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count });
  const { data: cryptoList } = useGetCryptoQuery(100);
  if (isFetching) return "Loading...";
  console.log(cryptoNews);
  return (
      <div>
        <Row gutter={[24, 24]}>
          { !simplified && (
           <Col span={24}>
             <Select showSearch
             className="select-news"
             placeholder="select crypto"
             optionFilterProp="children"
             onChange={(e) => setNewsCategory(e)}
             filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
             <Option value="Cryptocurrency">Cryptocurrency</Option>
               {cryptoList && cryptoList.data && cryptoList.data.coins.map(crypto => (
                   <Option value={crypto.name}>{crypto.name}</Option>
               ))}
             </Select>
           </Col>
          )
          }
        { cryptoNews && cryptoNews.value && cryptoNews.value.map((news, index) => (
            <Col xs='24' md='12' lg='6' id={news.id} key={index}>
              <Card className="news-card" hoverable>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                    <img style={{width: '100px'}}
                        src={news.provider[0].image ? news.provider[0].image.thumbnail.contentUrl : demoImage}
                        alt="news"/>
                  </div>
                    <p>
                      {news.description.length > 200 ? `${news.description.substring(0, 100)} ...` : news.description}
                    </p>
                    <div className="provider-container">
                      <div>
                        <Avatar src={news.provider[0].image ? news.provider[0].image.thumbnail.contentUrl : demoImage}/>
                        <Text className="provider-name">{news.provider[0].name}</Text>
                      </div>
                      <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                    </div>
                </a>
              </Card>
            </Col>
        ))}
      </Row>
      </div>
  );
};

export default NewsPage;