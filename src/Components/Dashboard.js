import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Carousel, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contentStyle = {
    maxWidth: '700px',
    width: '100%',
    height: '250px',
    color: '#fff',
    textAlign: 'center',
    background: '#f0f6ff',
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.employee_name) {
      setEmployeeName(authData.employee_name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authData');
    navigate('/login');
  };

  const carouselItems = [
    {
      title: `Hi, ${employeeName}!`,
      message: 'Welcome to our MIS application. Hope you have a good day.',
      imageSrc: `${process.env.PUBLIC_URL}/images/welcome_dashboard.gif`,
    },
    {
      title: `Hi, ${employeeName}!`,
      message: 'Welcome to our MIS application. Hope you have a good day.',
      imageSrc: `${process.env.PUBLIC_URL}/images/welcome_dashboard.gif`,
    },
  ];

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className={`sider ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            style={{ width: '100%' }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
        <div className="logout-container">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Sider>
      <Layout className={`layout-content ${collapsed ? 'collapsed' : ''}`}>
        <Header
          className="header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="content"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Carousel autoplay dots style={contentStyle}>
            {carouselItems.map((item, index) => (
              <div key={index}>
                <Row>
                  <Col span={12}>
                    <div className="greeting-container">
                      <h2 className="greeting-title">{item.title}</h2>
                      <p className="greeting-message">
                        {item.message}
                      </p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <img
                      src={item.imageSrc}
                      alt="Welcome Image"
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </Carousel>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
