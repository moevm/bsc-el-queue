import React from 'react'
import { inject, observer } from 'mobx-react'

import StudentRegistration from '@app/modules/user/StudentRegistration'
import ComeInQueue from '@app/modules/room/ComeInQueue'

@inject('studentStore')
@observer
class RoomActions extends React.Component {
  render() {
    const { studentStore, roomId, queueId } = this.props

    if (!studentStore.isAuthorized) {
      return (
        <StudentRegistration/>
      )
    }

    if (!studentStore.isInQueue) {
      return (
        <ComeInQueue
          roomId={roomId}
          queueId={queueId}
        />
      )
    }

    return (
      <div>
        Left
      </div>
    )
  }
}

export default RoomActions
