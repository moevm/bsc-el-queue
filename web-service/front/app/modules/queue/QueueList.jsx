import React from 'react'

class QueueList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      queues: props.queues
    }
  }

  componentDidMount() {
    const { socket, roomId } = this.props

    socket.emit('queues', roomId)

    socket.on('queues', (queues) => {
      this.setState({ queues })
    })
  }

  handleQueueClick = (queueId) => () => {
    this.props.toggleQueue(queueId)
  }

  render() {
    const { queues } = this.state

    return (
      <div>
        <div>Queue list:</div>
        <For each='queue' of={queues}>
          <div
            key={queue.id}
            onClick={this.handleQueueClick(queue.id)}
          >
            {queue.name}
          </div>
        </For>
      </div>
    )
  }
}

export default QueueList
