import React from 'react'
import { observer } from 'mobx-react'

import ComeInQueue from '@app/modules/room/ComeInQueue'
import StudentInQueueActions from '@app/modules/room/StudentInQueueActions'

const StudentRoomActions = ({ userStore }) => {
  if (!userStore.isInQueue) {
    return (
      <ComeInQueue
        userStore={userStore}
      />
    )
  }

  return (
    <StudentInQueueActions
      userStore={userStore}
    />
  )
}

export default StudentRoomActions |> observer
