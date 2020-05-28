import React from 'react'

import StudentRoomActions from '@app/modules/room/StudentRoomActions'
import StudentRegistration from '@app/modules/user/StudentRegistration'
import TeacherRegistration from '@app/modules/user/TeacherRegistration'
import TeacherRoomActions from '@app/modules/room/TeacherRoomActions'

import Text from '@locale'
import { UserRole } from '@app/constants'

class RoomActions extends React.Component {
  render() {
    const { roomId, queueId, userStore, queueStore } = this.props

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
      return (
        <TeacherRoomActions
          userStore={userStore}
          queueStore={queueStore}
          roomId={roomId}
          queueId={queueId}
        />
      )
    }

    return (
      <StudentRoomActions
        userStore={userStore}
        queueStore={queueStore}
        roomId={roomId}
        queueId={queueId}
      />
    )
  }
}

export default RoomActions
