import React from 'react'

import RoomContainer from '@app/pages/RoomPage/RoomContainer'

import RoomStore from '@app/modules/room/RoomStore'

class RoomPage extends React.Component {
  constructor(props) {
    super(props)

    this.roomStore = new RoomStore()
  }

  get roomId() {
    return this.props.match.params.roomId
  }

  render() {
    const fetchData = {
      id: {
        roomId: this.roomId,
      },
    }

    return (
      <RoomContainer
        fetchData={fetchData}
        fetchStore={this.roomStore}
      />
    )
  }
}

export default RoomPage
