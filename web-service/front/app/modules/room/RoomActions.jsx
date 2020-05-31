import React from 'react'

import StudentRoomActions from '@app/modules/room/StudentRoomActions'
import StudentRegistration from '@app/modules/user/StudentRegistration'
import TeacherRegistration from '@app/modules/user/TeacherRegistration'
import TeacherRoomActions from '@app/modules/room/TeacherRoomActions'

import Text from '@locale'

const RoomActions = ({ userStore }) => {
  if (userStore.isStudent) {
    return (
      <StudentRoomActions
        userStore={userStore}
      />
    )
  }

  if (userStore.isTeacher) {
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
