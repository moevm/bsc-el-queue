import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import Text from '@locale'

@inject('studentStore')
@observer
class ComeInQueue extends React.Component {
  state = {
    loading: false,
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    })
    const { studentStore, roomId, queueId } = this.props

    await studentStore.comeInQueue({ roomId, queueId })
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const { loading } = this.state

    return (
      <Button
        onClick={this.handleClick}
        loading={loading}
      >
        {Text.page.room.comeIn}
      </Button>
    )
  }
}

export default ComeInQueue
