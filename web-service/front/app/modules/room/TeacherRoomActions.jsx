import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import Text from '@locale'

@observer
class TeacherRoomActions extends React.Component {
  handleApplyCurrentStudent = () => {
    this.props.userStore.applyStudent()
  }

  handleRejectCurrentStudent = () => {
    this.props.userStore.rejectStudent()
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
