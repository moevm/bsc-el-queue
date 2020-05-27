import * as R from 'ramda'
import { action, computed, observable } from 'mobx'

import logger from '@app/lib/logger'

import API from '@app/api'
import { LOCAL_USER_ID, StoreState, UserRole } from '@app/constants'

class StudentStore {
  constructor(studentId) {
    this.studentId = studentId
  }

  @observable studentId = null
  @observable name = null
  @observable state = StoreState.INACTIVE
  @observable isInQueue = false
  role = UserRole.STUDENT

  @action
  setId = (id) => {
    this.studentId = id

    localStorage.setItem(LOCAL_USER_ID, id)
  }

  @action
  setName = (name) => {
    this.name = name
  }

  @action
  setIsInQueue = (isInQueue) => {
    this.isInQueue = isInQueue
  }

  @action
  setState = (state) => {
    this.state = state
  }

  @computed
  get isPending() {
    return this.state === StoreState.PENDING
  }

  @computed
  get isAuthorized() {
    return this.studentId |> R.isNil |> R.not
  }

  comeInQueue = async ({ roomId, queueId }) => {
    try {
      const result = await API.queue.addUser({
        id: {
          roomId,
          queueId,
          studentId: this.studentId,
        },
      })

      this.setIsInQueue(true)
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  checkIsInQueue = async ({ roomId, queueId }) => {
    try {
      const result = await API.queue.checkIsUserInQueue({
        id: {
          roomId,
          queueId,
          studentId: this.studentId,
        },
      })

      this.setIsInQueue(result)
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  leaveQueue = async ({ roomId, queueId }) => {
    try {
      const result = await API.queue.leave({
        id: {
          roomId,
          queueId,
          studentId: this.studentId,
        },
      })

      this.setIsInQueue(false)
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  skipStudent = async ({ roomId, queueId }) => {
    try {
      await API.queue.skip({
        id: {
          roomId,
          queueId,
          studentId: this.studentId,
        },
      })
    } catch (error) {
      logger.error(error)

      throw error
    }
  }
}

export default StudentStore