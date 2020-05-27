import React from 'react'
import { inject, observer } from 'mobx-react'

import RoomConnection from '@app/modules/ui/RoomConnection'

@inject('userStore')
@observer
class TeacherPage extends React.Component {
  constructor(props) {
    super(props)

    this.userStore = props.userStore.getInstance()
  }

  render() {
    const { id, name } = this.userStore
    return (
      <div>
        <div>
          <span>Ваш ID:</span>
          <span>{id}</span>
        </div>
        <div>{name}</div>
        <RoomConnection />
      </div>
    )
  }
}

export default TeacherPage
