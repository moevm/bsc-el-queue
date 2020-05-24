import React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Button, Form, Input } from 'antd'

import Text from '@locale'

@inject('studentStore')
@observer
class StudentRegistration extends React.Component {
  state = {
    visible: false,
    loading: false,
    isLogin: true,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  // toggle from login to registration
  toggleLogin = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
    }))
  }

  onRegistrationFinish = async values => {
    this.setState({
      loading: true,
    })

    const { studentStore } = this.props

    await studentStore.register(values)
      .then(studentId => {
        this.setState({
          visible: false,
          loading: false,
        })

        studentStore.setId(studentId)
      })
  }

  onLoginFinish = async values => {
    this.setState({
      loading: true,
    })

    const { studentStore } = this.props

    await studentStore.login(values)
      .then(({ _id, name }) => {
        console.log(_id, name)
        this.setState({
          visible: false,
          loading: false,
        })

        studentStore.setStudent({ id: _id, name })
      })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  renderFooter = () => {
    const { loading, isLogin } = this.state

    return [
      <Button
        key="login"
        onClick={this.toggleLogin}
      >
        {
          isLogin
            ? Text.page.room.registration.goToRegister
            : Text.page.room.registration.goToLogin
        }
      </Button>,
      <Button
        form="registration"
        key="submit"
        htmlType="submit"
        type="primary"
        loading={loading}
      >
        {
          isLogin
            ? Text.page.room.registration.login
            : Text.page.room.registration.register
        }
      </Button>,
    ]
  }

  renderRegistrationForm = () => {
    return (
      <Form
        id="registration"
        onFinish={this.onRegistrationFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label={Text.page.room.registration.firstName}
          name="firstName"
          rules={[{ required: true, message: Text.page.room.registration.firstNameError }]}

        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={Text.page.room.registration.lastName}
          name="lastName"
          rules={[{ required: true, message: Text.page.room.registration.lastNameError }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  renderLoginForm = () => {
    return (
      <Form
        id="registration"
        onFinish={this.onLoginFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label={Text.page.room.registration.userId}
          name="studentId"
          rules={[{
            required: true,
            message: Text.page.room.registration.userIdError,
          }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { visible, isLogin } = this.state

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {Text.page.room.userLogin}
        </Button>
        <Modal
          title="Title"
          visible={visible}
          onCancel={this.handleCancel}
          footer={this.renderFooter()}
        >
          <Choose>
            <When condition={isLogin}>
              {this.renderLoginForm()}
            </When>
            <Otherwise>
              {this.renderRegistrationForm()}
            </Otherwise>
          </Choose>
        </Modal>
      </div>
    )
  }
}

export default StudentRegistration
