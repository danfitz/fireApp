// Modules
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
// Child Components
import SettingsForm from '../../components/SettingsForm'
// UI Components
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Header, Sider, Content, Footer } = Layout

const Settings = props => {
  const [user, setUser] = useState(undefined)
  const [menuSelection, setMenuSelection] = useState('user')

  useEffect(() => {
    axios.get(`/api/users/${props.username}`)
      .then(response => {
        const myUser = { ...response.data.user }
        myUser.birthday = moment(myUser.birthday)
        setUser(myUser)
      })
      .catch(error => console.log(error.response))
  }, [props.username])

  const updateUser = updatedUser => {
    axios.post(`/api/users/${props.username}`, { data: updatedUser })
      .then(response => {
        const myUser = { ...response.data.user }
        myUser.birthday = moment(myUser.birthday)
        setUser(myUser)
      })
      .catch(error => console.log(error.response))
  }

  const handleMenuSelect = ({ key }) => setMenuSelection(key)

  if (user) {
    return (
      <Layout>
        <Header>
        </Header>

        <Layout>
          <Sider
            theme='light'
            breakpoint='sm'
            collapsedWidth={0}
            zeroWidthTriggerStyle={{ top: 0 }}
          >
            <Menu
              defaultSelectedKeys={['user']}
              onSelect={handleMenuSelect}
              style={{ height: '100%' }}
            >
              <Menu.Item key='user'>
                <UserOutlined />
                <span>User</span>
              </Menu.Item>
              <Menu.Item key='investments'>
                <UserOutlined />
                <span>Investments</span>
              </Menu.Item>
              <Menu.Item key='expenses'>
                <UserOutlined />
                <span>Expenses</span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Content style={{ padding: 50, background: '#fff' }}>
            { menuSelection === 'user' ? (
              <SettingsForm values={user} onFinish={updateUser} />
            ) : null }

            { menuSelection === 'investments' ? (
              <div>{JSON.stringify(user, null, 2)}</div>
            ) : null }
          </Content>
        </Layout>
        
        <Footer />
      </Layout>
    )  
  }
  else return null
}

export default Settings