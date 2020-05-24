import { action, computed, observable } from 'mobx'
import * as R from 'ramda'

import { StoreState } from '@app/constants'
import logger from "@app/lib/logger";

const defaultRequest = () => {
  throw new Error('Need to pass request to constructor')
}

export default class AbstractFetchStore {
  constructor(request = defaultRequest) {
    this.request = request
  }

  @observable data = null
  @observable requestData = null
  @observable defaultRequest = {}
  @observable state = null
  @observable errorMessage = null

  @computed
  get isPending() {
    return R.or(
      R.isNil(this.state),
      R.equals(this.state, StoreState.PENDING),
    )
  }

  @computed
  get isError() {
    return R.equals(this.state, StoreState.ERROR)
  }

  @computed
  get isDone() {
    return R.equals(this.state, StoreState.DONE)
  }

  @action
  setDefaultRequest = (defaultRequest) => {
    this.defaultRequest = defaultRequest
  }

  @action
  setData = (data) => {
    this.data = data
  }

  @action
  setRequestData = (requestData) => {
    this.requestData = requestData
  }

  @action
  setState = (state) => {
    this.state = state
  }

  @action
  setErrorMessage = (errorMessage) => {
    this.errorMessage = errorMessage
  }

  async loadData(params) {
    try {
      this.setState(StoreState.PENDING)

      const request = params |> R.mergeDeepRight(this.defaultRequest)

      const data = await this.request(request)

      this.setRequestData(request)
      this.setData(data)
      this.setState(StoreState.DONE)

      return data
    } catch (error) {
      this.setState(StoreState.ERROR)
      this.setErrorMessage(error)
      logger.error(error)
    }
  }
}
