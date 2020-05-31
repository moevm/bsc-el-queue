import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import Text from '@locale'

class CreateQueue extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      loading: false,
    }
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

  renderFooter = () => {
    const { loading } = this.state

    return [
      <Button
        form="create-queue"
        key="submit"
        htmlType="submit"
        type="primary"
        loading={loading}
      >
        {Text.common.create}
      </Button>,
    ]
  }

  onFinish = async values => {
    this.setState({
      loading: true,
    })

    await this.props.roomStore.createQueue(values)
      .then(() => {
        this.setState({
          visible: false,
          loading: false,
        })
      })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  renderForm = () => {
    return (
      <Form
        id="create-queue"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        initialValues={{ name: 'Очередь' }}
      >
        <Form.Item
          label={Text.page.room.queueName}
          name="name"
          rules={[{
            required: true,
            message: Text.page.room.queueNameError,
          }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    )
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.showModal}
        >
          {Text.page.room.newQueue}
        </Button>
        <Modal
          title={Text.page.room.newQueue}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={this.renderFooter()}
        >
          {this.renderForm()}
        </Modal>
      </div>
    )
  }
}

export default CreateQueue
