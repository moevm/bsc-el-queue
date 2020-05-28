import React from 'react'
import { Modal, Button, Form, Input } from 'antd'

import Text from '@locale'

class TeacherRegistration extends React.Component {
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

    const { userStore } = this.props

    await userStore.teacherRegistration(values)
      .then(() => {
        this.setState({
          visible: false,
          loading: false,
        })
      })
  }

  onLoginFinish = async values => {
    this.setState({
      loading: true,
    })

    const { userStore } = this.props

    await userStore.teacherLogin({
      teacherId: values.id,
      password: values.password,
    })
      .then(({ _id, name }) => {
        console.log(_id, name)
        this.setState({
          visible: false,
          loading: false,
        })
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
            ? Text.registration.goToRegister
            : Text.registration.goToLogin
        }
      </Button>,
      <Button
        form="user-registration"
        key="submit"
        htmlType="submit"
        type="primary"
        loading={loading}
      >
        {
          isLogin
            ? Text.registration.login
            : Text.registration.register
        }
      </Button>,
    ]
  }

  renderRegistrationForm = () => {
    return (
      <Form
        id="user-registration"
        onFinish={this.onRegistrationFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label={Text.registration.firstName}
          name="firstName"
          rules={[{ required: true, message: Text.registration.firstNameError }]}

        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={Text.registration.lastName}
          name="lastName"
          rules={[{ required: true, message: Text.registration.lastNameError }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={Text.registration.password}
          name="password"
          rules={[{ required: true, message: Text.registration.passwordError }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  renderLoginForm = () => {
    return (
      <Form
        id="user-registration"
        onFinish={this.onLoginFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label={Text.registration.userId}
          name="id"
          rules={[{
            required: true,
            message: Text.registration.userIdError,
          }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={Text.registration.password}
          name="password"
          rules={[{
            required: true,
            message: Text.registration.passwordError,
          }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { visible, isLogin } = this.state
    const { startButtonText } = this.props

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {startButtonText}
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

export default TeacherRegistration
