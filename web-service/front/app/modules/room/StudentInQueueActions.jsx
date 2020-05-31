import React from 'react'
import { Button } from 'antd'

import Text from '@locale'

class StudentInQueueActions extends React.Component {
  state = {
    leaveLoading: false,
    skipLoading: false,
  }

  handleLeaveClick = async () => {
    this.setState({
      leaveLoading: true,
    })

    await this.props.userStore.leaveQueue()
  }

  handleSkipClick = async () => {
    this.setState({
      skipLoading: true,
    })

    await this.props.userStore.skip()
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
