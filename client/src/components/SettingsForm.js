import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styled from 'styled-components'

// const StyledForm = styled(Form)`
//   max-width: 15rem;
//   margin: 0 auto;
// `

const SettingsForm = ({ values, onFinish }) => {
  return (
    <Form
      initialValues={values}
      onFinish={onFinish}
    >
      {Object.keys(values).map(name => (
        <Form.Item
          key={name}
          name={name}
          label={name.split('_').join(' ')}
          rules={[{ required: true, message: `Input ${name.split('_').join(' ')}`}]}
        >
          <Input />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

// const WrappedSettingsForm = Form.create({ name: 'normal_login' })(SettingsForm)

// export default WrappedSettingsForm
export default SettingsForm