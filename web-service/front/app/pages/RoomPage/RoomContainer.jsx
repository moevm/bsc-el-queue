import React from 'react'
import * as R from 'ramda'

import RemoteDataHOC from "@app/hocs/RemoteDataHOC";

import Queue from "@app/modules/queue/Queue";
import QueueList from "@app/modules/queue/QueueList";

import QueueStore from "@app/modules/queue/QueueStore";

import { getSocketio } from "@app/socket";

class RoomContainer extends React.Component {
  constructor(props) {
    super(props)

    this.queueStore = new QueueStore()
    this.socket = getSocketio()

    this.state = {
      currentQueue: props.data.queues |> R.head |> R.prop('id')
    }
  }

  toggleCurrentQueue = async (queueId) => {
    const { data } = this.props

    this.setState({
      currentQueue: queueId,
    })

    await this.queueStore.loadData({
      id: {
        roomId: data._id,
        queueId,
      },
    })
  }

  render() {
    const { data } = this.props
    const { currentQueue } = this.state

    const fetchData = {
      id: {
        roomId: data._id,
        queueId: currentQueue
      },
    }

    return (
      <div>
        <h1>Container</h1>
        <QueueList
          queues={data.queues}
          roomId={data._id}
          socket={this.socket}
          toggleQueue={this.toggleCurrentQueue}
        />
        <Queue
          fetchData={fetchData}
          fetchStore={this.queueStore}
          socket={this.socket}
          queueId={currentQueue}
        />
        {/*<Actions />*/}
      </div>
    )
  }
}

export default RoomContainer|> RemoteDataHOC
