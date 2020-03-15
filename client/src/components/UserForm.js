import React from 'react'
import {
  PageHeader,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  message
} from 'antd'

const layout = {
  labelCol: { span: 2, offset: 6 },
  wrapperCol: { span: 8 }
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const fieldTypes = {
  'first_name': 'text',
  'last_name': 'text',
  'birthday': 'date',
  'roi': 'percentage',
  'withdrawal_rate': 'percentage',
  'inflation_rate': 'percentage',
  'posttax_income': 'money'
}

const UserForm = ({ values, onFinish }) => {
  const onSuccess = values => {
    const processedValues = {
      ...values,
      birthday: values.birthday.format('YYYY-MM-DD') // <= must convert moment object to date string
    }

    message.success('Successfully saved')
    onFinish(processedValues)
  }
    
  const onFail = errorInfo => {
    const { errorFields } = errorInfo
    const fieldsMessage = errorFields.map(error => error.name[0].split('_').join(' ')).join(', ')

    message.error(`The following fields were input incorrectly: ${fieldsMessage}`)
  }

  return (
    <React.Fragment>
      <PageHeader title='User' />
      <Form
        {...layout}
        layout='horizontal'
        colon={false}
        hideRequiredMark
        size='large'
        initialValues={values}
        onFinish={onSuccess}
        onFinishFailed={onFail}
      >
        {Object.keys(values).map(name => {
          let ConditionalInput
          switch (fieldTypes[name]) {
            case 'text':
              ConditionalInput = <Input />
              break
            case 'date':
              ConditionalInput = <DatePicker format='MMM D, YYYY' />
              break
            case 'percentage':
              ConditionalInput = <InputNumber
                formatter={value => {
                  const percentage = Math.floor(value * 100)
                  if (Number.isNaN(percentage)) return ''
                  else return `${percentage} %`
                }}
                parser={value => value.replace(' %', '') / 100}
                step={0.01}
              />
              break
            case 'money':
              ConditionalInput = <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                step={1000}
              />
              break
            default:
              ConditionalInput = <Input />
          }

          return (
            <Form.Item
              key={name}
              name={name}
              label={name.split('_').join(' ')}
              rules={[{ required: true, message: `${name.split('_').join(' ')} required`}]}
            >
              {ConditionalInput}
            </Form.Item>
          )
        })}
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
}

export default UserForm