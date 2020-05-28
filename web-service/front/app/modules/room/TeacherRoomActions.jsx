import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import Text from '@locale'

@observer
class TeacherRoomActions extends React.Component {
  handleApplyCurrentStudent = () => {
    const { roomId, queueId, userStore, queueStore } = this.props
    const studentId = queueStore.firstStudent.id

    userStore.applyStudent({
      roomId,
      queueId,
      studentId,
    })
  }

  handleRejectCurrentStudent = () => {
    const { roomId, queueId, userStore, queueStore } = this.props
    const studentId = queueStore.firstStudent.id

    userStore.rejectStudent({
      roomId,
      queueId,
      studentId,
    })
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default TeacherRoomActions
