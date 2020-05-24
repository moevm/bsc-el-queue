import React from 'react'
import RemoteDataHOC from "@app/hocs/RemoteDataHOC";

class Queue extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      students: props.data.students
    }
  }

  componentDidMount() {
    const { socket, queueId } = this.props

    socket.emit('students', queueId)

    socket.on('students', (students) => {
      this.setState({ students })
    })
  }

  render() {
    const { students } = this.state

    return (
      <div>
        <div>Students:</div>
        <div>
          <For each='student' of={students}>
            <div key={student.id}>{student.name}</div>
          </For>
        </div>
      </div>
    )
  }
}

export default Queue|> RemoteDataHOC
