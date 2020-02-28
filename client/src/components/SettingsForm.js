import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  max-width: 15rem;
  margin: 0 auto;
`

const SettingsForm = props => {
  const { getFieldDecorator } = props.form

  return (
    <StyledForm onSubmit={props.handleSubmit} className='login-form'>
      {Object.entries(props.values).map(([name, value]) => (
        <Form.Item>
          {getFieldDecorator(name, {
            rules: [{ required: true, message: `Input ${name.split('_').join(' ')}`}]
          })(
            <Input
              prefix={<Icon type={name} />}
              placeholder={name.split('_').join(' ')}
              defaultValue={value}
              // onChange={props.handleUsername}
            />
          )}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit' className='login-form-button'>
        Save
      </Button>
    </StyledForm>
  )
}

const WrappedSettingsForm = Form.create({ name: 'normal_login' })(SettingsForm)

export default WrappedSettingsForm