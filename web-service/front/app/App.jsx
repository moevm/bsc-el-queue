import React from 'react'
import { observer, Provider } from 'mobx-react'
import { withRouter } from 'react-router'
import 'antd/dist/antd.css'

import logger from '@app/lib/logger'

import LoadingComponent from '@app/modules/ui/Loading/LoadingComponent'
import ErrorPage from '@app/pages/Error/ErrorPage'

import UserStore from '@app/modules/user/UserStore'

@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }

    this.userStore = new UserStore()
    this.userStore.getRole()
  }

  static getDerivedStateFromError(error) {
    return { error }
  }


  render() {
    logger.debug('Rendering App')

    const { error: criticalError } = this.state
    const { children } = this.props

    const userStore = this.userStore.getInstance()

    if (userStore.isPending) {
      return <LoadingComponent />
    }

    if (criticalError) {
      return <ErrorPage error={criticalError} />
    }


    return (
      <Provider
        userStore={userStore}
      >
        {children}
      </Provider>
    )
  }
}

export default withRouter(App)
