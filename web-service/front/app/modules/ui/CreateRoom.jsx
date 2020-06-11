import React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Button, Form, Input } from 'antd'

import Text from '@locale'
import { Route as RoomPageRoute } from '@app/pages/RoomPage'

@inject('navigationStore')
@observer
class CreateRoom extends React.Component {
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

  onFinish = async values => {
    this.setState({
      loading: true,
    })

    const { userStore, navigationStore } = this.props

    await userStore.createRoom(values)
      .then((roomId) => {
        this.setState({
          visible: false,
          loading: false,
        })

        const path = RoomPageRoute.getUrl({ roomId })
        navigationStore.goToPage(path)
      })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  renderFooter = () => {
    return [
      <Button
        form="create-room"
        key="submit"
        htmlType="submit"
        type="primary"
        loading={this.state.loading}
      >
        {Text.common.create}
      </Button>,
    ]
  }

  renderForm = () => {
    return (
      <Form
        id="create-room"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label={Text.page.teacher.roomName}
          name="name"
          rules={[{
            required: true,
            message: Text.page.teacher.roomName,
          }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { visible } = this.state

    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
        >
          {Text.page.teacher.createRoom}
        </Button>
        <Modal
          title="Title"
          visible={visible}
          onCancel={this.handleCancel}
          footer={this.renderFooter()}
        >
          {this.renderForm()}
        </Modal>
      </div>
    )
  }
}

export default CreateRoom
