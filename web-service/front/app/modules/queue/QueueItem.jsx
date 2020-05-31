import React from 'react'
import { Button, Modal } from 'antd'

import Text from '@locale'
import { UserRole } from '@app/constants'

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

    const showOptions = userStore.role === UserRole.TEACHER

    return (
      <div>
        <div>{name}</div>
        <If condition={showOptions}>
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
          >
            <Button
              onClick={this.handleApplyCurrentStudent}
            >
              {Text.page.room.applyStudent}
            </Button>
            <Button
              onClick={this.handleRejectCurrentStudent}
            >
              {Text.page.room.rejectStudent}
            </Button>
          </Modal>
        </If>
      </div>
    )
  }
}

export default QueueItem
