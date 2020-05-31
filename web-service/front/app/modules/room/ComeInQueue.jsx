import React from 'react'
import { Button } from 'antd'

import Text from '@locale'

class ComeInQueue extends React.Component {
  state = {
    loading: false,
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    })

    await this.props.userStore.comeInQueue()
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
