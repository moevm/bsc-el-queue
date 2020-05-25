import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import Text from '@locale'

@inject('studentStore')
@observer
class StudentInQueueActions extends React.Component {
  state = {
    leaveLoading: false,
    skipLoading: false,
  }

  handleLeaveClick = async () => {
    const { studentStore, roomId, queueId } = this.props

    this.setState({
      leaveLoading: true,
    })

    await studentStore.leaveQueue({ roomId, queueId })
  }

  handleSkipClick = async () => {
    const { studentStore, roomId, queueId } = this.props

    this.setState({
      skipLoading: true,
    })

    await studentStore.skipStudent({ roomId, queueId })
      .then(() => {
        this.setState({
          skipLoading: false,
        })
      })
  }

  render() {
    const { leaveLoading, skipLoading } = this.state

    return (
      <React.Fragment>
        <Button
          onClick={this.handleLeaveClick}
          loading={leaveLoading}
        >
          {Text.page.room.leave}
        </Button>
        <Button
          onClick={this.handleSkipClick}
          loading={skipLoading}
        >
          {Text.page.room.skip}
        </Button>
      </React.Fragment>
    )
  }
}

export default StudentInQueueActions
