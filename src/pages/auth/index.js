import { Form, Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Login({ setAdminData }){
    async function loginUser(credentials) {
        return axios.post('https://universities-app-backend.onrender.com/rest-auth/login/', credentials)
          .then(res => res.data)
    }

    const onFinish = async (values) => {
      console.log('Success:', values);
      const data = await loginUser(values);
      setAdminData(data);
    };
  
    const onFinishFailed = (errorInfo) => {
      alert('Failed:', errorInfo)
    };
  

   return(
    <Form
    {...layout}
    className="login-wrapper"
    name="basic"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
   )
}


Login.propTypes = {
   setAdminData: PropTypes.func.isRequired
}