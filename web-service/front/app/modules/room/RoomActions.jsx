import React from 'react'
import { inject, observer } from "mobx-react";

import StudentRegistration from "@app/modules/user/StudentRegistration";

@inject('studentStore')
@observer
class RoomActions extends React.Component {
  render() {
    const { studentStore } = this.props

    if (!studentStore.isAuthorized) {
      return (
        <StudentRegistration />
      )
    }

    return (
      <div>Добавится в очередь</div>
    )
  }
}

export default RoomActions
