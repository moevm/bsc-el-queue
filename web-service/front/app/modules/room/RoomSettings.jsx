import React from 'react'
import AddTeacherForm from '@app/modules/room/AddTeacherForm'

class RoomSettings extends React.Component {
  render() {
    const {userStore} = this.props

    return (
      <AddTeacherForm
        userStore={userStore}
      />
    )
  }
}

export default RoomSettings
