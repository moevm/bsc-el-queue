import React from 'react'
import * as R from 'ramda'
import { inject, observer } from 'mobx-react'

import RemoteDataHOC from '@app/hocs/RemoteDataHOC'

import Queue from '@app/modules/queue/Queue'
import QueueList from '@app/modules/queue/QueueList'
import RoomActions from '@app/modules/room/RoomActions'

import QueueStore from '@app/modules/queue/QueueStore'
import RoomLogger from '@app/modules/roomLogger/RoomLogger'

import Text from '@locale'
import { getSocketio } from '@app/socket'
import RoomSettings from '@app/modules/room/RoomSettings'

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
    userStore.setRoomStore(this.roomStore)

    const fetchData = {
      id: {
        roomId: this.roomStore.id,
        queueId: this.roomStore.currentQueue,
      },
    }

    return (
      <div>
        <h1>{this.roomStore?.data.name}</h1>
        <h3>ID комнаты: {this.roomStore?.data._id}</h3>
        <h3>Очередь: {this.queueStore?.name}</h3>
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
          userStore={userStore}
        />
        <If condition={userStore.isTeacher}>
          <RoomSettings
            userStore={userStore}
          />
        </If>
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
