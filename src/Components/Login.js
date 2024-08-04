import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios.post('https://api.dev.hexafoldtech.com/employee/login', {
      username: values.username,
      password: values.password,
    })
    .then(response => {
      if (response.status === 200 && response.data.token) {
        // const employeeName = response.data.data.employee_name;
        const { token, data } = response.data;
        const { employee_name } = data;
        const authData = { token, employee_name };
        localStorage.setItem('authData', JSON.stringify(authData));
        // console.log(authData);
        navigate('/dashboard');
      } else {
        message.error('Login failed: Invalid credentials');
      }
    })
    .catch(error => {
      console.error('Login failed:', error);
      message.error('Login failed: An error occurred');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="login-container">
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="logo Image"
        />
        <div className="image-container">
          <img
            className="login-image"
            src={`${process.env.PUBLIC_URL}/images/login.svg`}
            alt="login Image"
          />
          <p className="login-containt">Optimize Operations with our MIS Dashboard Empower your team with insights that drive performance.</p>
        </div>
        <div className="form-container">
          <div className="welcome-text">
            <h1>Welcome!</h1>
            <p>Please Sign in to continue to MIS</p>
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" className="login-input" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" className="login-input" />
            </Form.Item>
            <Form.Item className="remember-me-wrapper">
              <Checkbox className="remember-me-checkbox">Remember me</Checkbox>
              <a href="" className="forgot-password">Forgot password</a>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" className="login-button" loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <footer className="footer">
        <hr/>
        <div className="footer-inner">
          <p className="footer-text">Copyright © 2024 | All rights reserved for Hexafold Technologies Pvt. Ltd.</p>
          <p className="footer-version">Version: 1.0.0</p>
        </div>
      </footer>
    </>
  );
};

export default Login;
