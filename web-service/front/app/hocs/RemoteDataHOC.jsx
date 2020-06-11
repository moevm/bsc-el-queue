import React from 'react'
import { observer } from 'mobx-react'

import LoadingComponent from '@app/modules/ui/Loading/LoadingComponent'

const RemoteDataHOC = Component => (
  @observer
  class extends React.Component {
    componentDidMount() {
      this.props.fetchStore.loadData(this.props.fetchData)
    }

    render() {
      const {
        isPending,
        isError,
        data,
        loadData,
      } = this.props.fetchStore

      if (isPending) {
        return <LoadingComponent />
      }

      if (isError) {
        return (
          <div>Something go wrong</div>
        )
      }

      return (
        <Component
          data={data}
          loadData={loadData}
          {...this.props}
        />
      )
    }
  }
)

export default RemoteDataHOC
