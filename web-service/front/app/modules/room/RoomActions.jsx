import React from 'react'

import { UserRole } from '@app/constants'
import StudentRoomActions from '@app/modules/room/StudentRoomActions'
import StudentRegistration from '@app/modules/user/StudentRegistration'

import Text from '@locale'
import TeacherRegistration from '@app/modules/user/TeacherRegistration'

class RoomActions extends React.Component {
  render() {
    const { roomId, queueId, userStore } = this.props

    if (userStore.role === UserRole.UNAUTHORIZED) {
      return (
        <>
          <StudentRegistration
            startButtonText={Text.page.main.studentAuthentication}
            userStore={userStore}
          />
          <TeacherRegistration
            startButtonText={Text.page.main.teacherAuthentication}
            userStore={userStore}
          />
        </>
      )
    }

    if (userStore.role === UserRole.TEACHER) {
      return 'TEACHER'
    }

    return (
      <StudentRoomActions
        userStore={userStore}
        roomId={roomId}
        queueId={queueId}
      />
    )
  }
}

export default RoomActions
