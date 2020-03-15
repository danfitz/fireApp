import React from 'react'
import {
  PageHeader,
  List,
  Form,
  Input,
  InputNumber,
  Select,
  Button
} from 'antd'

const fieldTypes = {
  'type': 'text',
  'amount': 'money'
}

const InvestmentForm = ({ investments, onFinish }) => {
  const renderInvestment = investment => (
    <List.Item>
      <Form
        layout='inline'
        colon={false}
        hideRequiredMark
        initialValues={investment}
        onFinish={onFinish}
      >
        {Object.keys(investment).map(name => {
          let ConditionalInput
          switch (fieldTypes[name]) {
            case 'text':
              ConditionalInput = <Input />
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
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </List.Item>
  )

  return (
    <React.Fragment>
      <PageHeader title='Investments' />

      <List
        dataSource={investments}
        renderItem={renderInvestment} />
    </React.Fragment>
  )
}

export default InvestmentForm