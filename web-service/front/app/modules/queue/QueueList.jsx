import React from 'react'
import { observer } from 'mobx-react'

import QueueListItem from '@app/modules/queue/QueueListItem'
import CreateQueue from '@app/modules/queue/CreateQueue'

@observer
class QueueList extends React.Component {
  componentDidMount() {
    const { socket, roomStore } = this.props

    socket.emit('room connect', roomStore.id)

    socket.on('queue update', (queues) => {
      roomStore.setQueues(queues)
    })
  }

  handleQueueClick = (queueId) => {
    this.props.toggleQueue(queueId)
  }

  handleQueueRemove = (queueId) => {
    this.props.roomStore.removeQueue(queueId)
  }

  render() {
    const { roomStore, userStore } = this.props

    return (
      <div>
        <div>Queue list:</div>
        <For each='queue' of={roomStore.queues}>
          <QueueListItem
            key={queue.id}
            id={queue.id}
            name={queue.name}
            onQueueClick={this.handleQueueClick}
            onRemoveClick={this.handleQueueRemove}
            isCurrent={roomStore.isQueueCurrent(queue.id)}
            removable={userStore.isTeacher && userStore.teacherAllowed}
          />
        </For>
        <If condition={userStore.isTeacher && userStore.teacherAllowed}>
          <CreateQueue
            roomStore={roomStore}
          />
        </If>
      </div>
    )
  }
}

export default QueueList
