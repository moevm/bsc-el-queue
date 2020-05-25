import * as R from 'ramda'
import { action, computed, observable } from 'mobx'

import logger from '@app/lib/logger'

import API from '@app/api'
import { LOCAL_STUDENT_ID } from '@app/constants'

class StudentStore {
  constructor() {
    const studentId = localStorage.getItem(LOCAL_STUDENT_ID)

    if (studentId) {
      console.log('Get studentId from localStorage: ', studentId)

      this.setId(studentId)
    }
  }

  @observable studentId = null
  @observable name = null
  @observable isInQueue = false

  @action
  setId = (id) => {
    this.studentId = id

    localStorage.setItem(LOCAL_STUDENT_ID, id)
  }

  @action
  setName = (name) => {
    this.name = name
  }

  @action
  setIsInQueue = (isInQueue) => {
    this.isInQueue = isInQueue
  }

  setStudent = ({ name, id }) => {
    this.setName(name)
    this.setId(id)
  }

  @computed
  get isAuthorized() {
    return this.studentId |> R.isNil |> R.not
  }


  login = async ({ studentId }) => {
    try {
      const result = await API.student.login({
        id: {
          studentId,
        },
      })

      console.log(result)
      return result
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  register = async ({ firstName, lastName }) => {
    try {
      const { studentId } = await API.student.register({
        body: {
          firstName,
          lastName,
        },
      })

      return studentId
    } catch (error) {
      logger.error(error)

      throw error
    }
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
