import React from 'react'
import { observer } from 'mobx-react'

import ComeInQueue from '@app/modules/room/ComeInQueue'
import StudentInQueueActions from '@app/modules/room/StudentInQueueActions'
import { UserRole } from '@app/constants'

@observer
class StudentRoomActions extends React.Component {
  componentDidMount() {
    const { roomId, queueId, userStore } = this.props

    if (userStore.role === UserRole.STUDENT) {
      userStore.checkIsInQueue({
        roomId,
        queueId,
      })
    }
  }

  render() {
    const { roomId, queueId, userStore } = this.props

    if (!userStore.isInQueue) {
      return (
        <ComeInQueue
          roomId={roomId}
          queueId={queueId}
          userStore={userStore}
        />
      )
    }

    return (
      <StudentInQueueActions
        roomId={roomId}
        queueId={queueId}
        userStore={userStore}

      />
    )
  }
}

export default StudentRoomActions
