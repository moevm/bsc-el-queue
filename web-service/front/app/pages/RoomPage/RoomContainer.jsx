import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'

import RemoteDataHOC from '@app/hocs/RemoteDataHOC'

import Queue from '@app/modules/queue/Queue'
import QueueList from '@app/modules/queue/QueueList'
import RoomActions from '@app/modules/room/RoomActions'

import QueueStore from '@app/modules/queue/QueueStore'

import { getSocketio } from '@app/socket'

@inject('userStore')
@observer
class RoomContainer extends React.Component {
  constructor(props) {
    super(props)

    this.roomStore = props.fetchStore
    this.queueStore = new QueueStore()
    this.socket = getSocketio()

    props.data.queues |> R.head |> R.prop('id') |> this.roomStore.setCurrentQueue
  }

  toggleCurrentQueue = async (queueId) => {
    this.roomStore.setCurrentQueue(queueId)

    await this.queueStore.loadData({
      id: {
        roomId: this.roomStore.id,
        queueId,
      },
    })
  }

  render() {
    const userStore = this.props.userStore.getInstance()

    userStore.setQueueStore(this.queueStore)

    const fetchData = {
      id: {
        roomId: this.roomStore.id,
        queueId: this.roomStore.currentQueue,
      },
    }

    return (
      <div>
        <h1>Container</h1>
        <QueueList
          socket={this.socket}
          toggleQueue={this.toggleCurrentQueue}
          userStore={userStore}
          roomStore={this.roomStore}
        />
        <Queue
          fetchData={fetchData}
          fetchStore={this.queueStore}
          socket={this.socket}
        />
        <If condition={!this.queueStore.isPending}>
          <RoomActions
            userStore={userStore}
            queueStore={this.queueStore}
          />
        </If>
      </div>
    )
  }
}

export default RoomContainer|> RemoteDataHOC
