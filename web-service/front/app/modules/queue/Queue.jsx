import React from 'react'
import { observer } from 'mobx-react'

import RemoteDataHOC from "@app/hocs/RemoteDataHOC";

@observer
class Queue extends React.Component {
  componentDidMount() {
    const { socket, queueId, fetchStore } = this.props

    socket.emit('students', queueId)

    socket.on('students', (students) => {
      fetchStore.setStudents(students)
    })
  }

  render() {
    const { data } = this.props

    return (
      <div>
        <div>Students:</div>
        <div>
          <For each='student' of={data.students}>
            <div key={student.id}>{student.name}</div>
          </For>
        </div>
      </div>
    )
  }
}

export default Queue|> RemoteDataHOC
