import React from 'react'
import { observer, Provider } from 'mobx-react'
import { withRouter } from 'react-router'

import logger from '@app/lib/logger'

// import LoadingComponent from '@app/modules/ui/Loading/LoadingComponent'

import ErrorPage from '@app/pages/Error/ErrorPage'

@observer
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }


  render() {
    logger.debug('Rendering App')

    const { error: criticalError } = this.state

    // if (this.userStore.isPending) {
    //   return <LoadingComponent />
    // }

    if (criticalError) {
      return <ErrorPage error={criticalError} />
    }

    const { children } = this.props

    return (
      <Provider>
        {children}
      </Provider>
    )
  }
}

export default withRouter(App)
