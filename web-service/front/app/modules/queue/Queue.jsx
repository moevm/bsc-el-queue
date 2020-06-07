import React from 'react'
import { observer } from 'mobx-react'

import RemoteDataHOC from "@app/hocs/RemoteDataHOC";
import QueueItem from '@app/modules/queue/QueueItem'

@observer
class Queue extends React.Component {
  constructor(props) {
    super(props)

    this.queueStore = this.props.fetchStore
  }

  componentDidMount() {
    const { socket } = this.props

    socket.emit('queue connect', this.queueStore.id)

    socket.on('students update', (students) => {
      this.queueStore.setStudents(students)
    })
  }

  render() {
    const { data, userStore } = this.props

    return (
      <div>
        <div>Students:</div>
        <div>
          <For each='student' of={data.students}>
            <QueueItem
              key={student.id}
              id={student.id}
              name={student.name}
              userStore={userStore}
              />
          </For>
        </div>
      </div>
    )
  }
}

export default Queue|> RemoteDataHOC
