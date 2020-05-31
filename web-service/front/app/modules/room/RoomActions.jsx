import React from 'react'

import StudentRoomActions from '@app/modules/room/StudentRoomActions'
import StudentRegistration from '@app/modules/user/StudentRegistration'
import TeacherRegistration from '@app/modules/user/TeacherRegistration'
import TeacherRoomActions from '@app/modules/room/TeacherRoomActions'

import Text from '@locale'
import { UserRole } from '@app/constants'

const RoomActions = ({ userStore }) => {
  if (userStore.role === UserRole.STUDENT) {
    return (
      <StudentRoomActions
        userStore={userStore}
      />
    )
  }

  if (userStore.role === UserRole.TEACHER) {
    return (
      <TeacherRoomActions
        userStore={userStore}
      />
    )
  }

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

export default RoomActions
