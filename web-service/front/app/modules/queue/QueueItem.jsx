import React from 'react'
import { Button, Modal } from 'antd'

import Text from '@locale'

class QueueItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleApplyCurrentStudent = () => {
    this.props.userStore.applyStudent(this.props.id)
  }

  handleRejectCurrentStudent = () => {
    this.props.userStore.rejectStudent(this.props.id)
  }

  render() {
    const { name, userStore } = this.props

    return (
      <div>
        <div>{name}</div>
        <If condition={userStore.isTeacher && userStore.teacherAllowed}>
          <Button
            onClick={this.showModal}
          >
            options
          </Button>
          <Modal
            title={name}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <Button
              onClick={this.handleApplyCurrentStudent}
            >
              {Text.common.apply}
            </Button>
            <Button
              onClick={this.handleRejectCurrentStudent}
            >
              {Text.common.reject}
            </Button>
          </Modal>
        </If>
      </div>
    )
  }
}

export default QueueItem
