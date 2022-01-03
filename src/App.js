import { Layout, Space, Typography } from "antd";
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import { CryptoDetails, Exchanges, HomePage, Navbar, NewsPage } from './components';

const App = () => {
  return (
      <div className="App">
        <div className="navbar">
          <Navbar/>
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/exchanges" element={<Exchanges/>}/>
                <Route path="/details/:id" exact element={<CryptoDetails/>}/>
                <Route exact path="/news" element={<NewsPage/>}/>
              </Routes>
            </div>
          </Layout>
        </div>
        <div className="footer" >
          <Typography.Title level={5} style={{color: "white", textAlign: "center"}}>
            CryptoVerse <br/>
            All right reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
  );
}

export default App;

