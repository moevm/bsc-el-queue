import React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Button, Form, Input } from 'antd'

import Text from '@locale'

@inject('userStore')
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

    const { userStore } = this.props

    await userStore.studentRegistration(values)
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

    await userStore.studentLogin(values)
      .then(({ _id, name }) => {
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
        form="student-registration"
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
        id="student-registration"
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
      </Form>
    )
  }

  renderLoginForm = () => {
    return (
      <Form
        id="student-registration"
        onFinish={this.onLoginFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label={Text.registration.userId}
          name="studentId"
          rules={[{
            required: true,
            message: Text.registration.userIdError,
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

export default StudentRegistration
