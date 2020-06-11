import React from 'react'
import { observer, Provider } from 'mobx-react'
import { withRouter } from 'react-router'
import 'antd/dist/antd.css'

import logger from '@app/lib/logger'

import LoadingComponent from '@app/modules/ui/Loading/LoadingComponent'
import ErrorPage from '@app/pages/Error/ErrorPage'

import UnauthorizedUserStore from '@app/modules/user/UnauthorizedUserStore'
import NavigationStore from '@app/modules/navigation/NavigationStore'

@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }

    this.userStore = new UnauthorizedUserStore()
    this.navigationStore = new NavigationStore(this.props.history)
  }

  componentDidMount() {
    this.userStore.get()
  }


  static getDerivedStateFromError(error) {
    return { error }
  }


  render() {
    logger.debug('Rendering App')

    const { error: criticalError } = this.state
    const { children } = this.props

    if (this.userStore.isPending) {
      return <LoadingComponent />
    }

    if (criticalError) {
      return <ErrorPage error={criticalError} />
    }


    return (
      <Provider
        userStore={this.userStore}
        navigationStore={this.navigationStore}
      >
        {children}
      </Provider>
    )
  }
}

export default withRouter(App)
