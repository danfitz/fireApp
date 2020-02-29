import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  max-width: 15rem;
  margin: 0 auto;
`

const LoginForm = ({ onFinish }) => {
  return (
    <StyledForm
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Input username'}]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder='Username'
        />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Input password'}]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder='Password'
        />
      </Form.Item>

      <Button type='primary' htmlType='submit' className='login-form-button'>
        Log in
      </Button>
    </StyledForm>
  )
}

export default LoginForm