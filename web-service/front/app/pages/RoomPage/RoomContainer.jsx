import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'

import RemoteDataHOC from '@app/hocs/RemoteDataHOC'

import Queue from '@app/modules/queue/Queue'
import QueueList from '@app/modules/queue/QueueList'
import RoomActions from '@app/modules/room/RoomActions'

import QueueStore from '@app/modules/queue/QueueStore'

import { getSocketio } from '@app/socket'

@inject('studentStore')
@observer
class RoomContainer extends React.Component {
  constructor(props) {
    super(props)

    this.queueStore = new QueueStore()
    this.socket = getSocketio()

    this.state = {
      currentQueue: props.data.queues |> R.head |> R.prop('id'),
    }

    props.studentStore.checkIsInQueue({
      roomId: props.data._id,
      queueId: this.state.currentQueue,
    })
  }

  componentDidUpdate() {
    this.props.studentStore.checkIsInQueue({
      roomId: this.props.data._id,
      queueId: this.state.currentQueue,
    })
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
        queueId: currentQueue,
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
        <RoomActions
          roomId={data._id}
          queueId={currentQueue}
        />
      </div>
    )
  }
}

export default RoomContainer|> RemoteDataHOC
