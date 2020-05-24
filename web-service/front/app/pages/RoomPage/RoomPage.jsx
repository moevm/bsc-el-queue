import React from 'react'

import RoomContainer from "@app/pages/RoomPage/RoomContainer";

import { getSocketio } from "@app/socket";
import RoomStore from "@app/modules/room/RoomStore";

class RoomPage extends React.Component {
  constructor(props) {
    super(props)

    this.roomStore = new RoomStore()

  }

  // componentDidMount() {
  //   const socket = getSocketio()
  //
  //   socket.emit('test', this.roomId)
  //
  //   socket.on('some', (data) => {
  //     console.log(data);
  //   });
  //
  //   socket.on('some1', (data) => {
  //     console.log('some1')
  //     console.log(data);
  //   });
  // }

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
      <React.Fragment>
        {/*<Header />*/}
        <RoomContainer
          fetchData={fetchData}
          fetchStore={this.roomStore}
        />
      </React.Fragment>
    )
  }
}

export default RoomPage
