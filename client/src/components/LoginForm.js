import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  max-width: 15rem;
  margin: 0 auto;
`

const LoginForm = props => {
  const { getFieldDecorator } = props.form

  return (
    <StyledForm onSubmit={props.handleSubmit} className='login-form'>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Input username'}]
        })(
          <Input
            prefix={<Icon type='user' />}
            placeholder='Username'
            onChange={props.handleUsername}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Input password'}]
        })(
          <Input
            prefix={<Icon type='lock' />}
            type='password'
            placeholder='Password'
            onChange={props.handlePassword}
          />
        )}
      </Form.Item>
      <Button type='primary' htmlType='submit' className='login-form-button'>
        Log in
      </Button>
    </StyledForm>
  )
}

const WrappedLoginForm = Form.create({ name: 'normal_login'})(LoginForm)

export default WrappedLoginForm