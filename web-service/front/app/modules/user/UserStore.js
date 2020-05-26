import { observable, action, computed } from 'mobx'

import StudentStore from '@app/modules/user/StudentStore'

import { LOCAL_USER_ID, UserRole, StoreState } from '@app/constants'

import API from '@app/api'
import logger from '@app/lib/logger'
import * as R from 'ramda'

class UserStore {
  constructor() {
    this.id = localStorage.getItem(LOCAL_USER_ID)
  }

  @observable id = null
  @observable data = null
  @observable state = StoreState.INACTIVE
  role = UserRole.UNAUTHORIZED

  @action
  setId = (id) => {
    this.id = id

    localStorage.setItem(LOCAL_USER_ID, id)
  }

  @action
  setData = (data) => {
    this.data = data

    localStorage.setItem(LOCAL_USER_ID, id)
  }

  @action
  setState = (state) => {
    this.state = state
  }

  @computed
  get isPending() {
    return this.state === StoreState.PENDING
  }

  studentRegistration = async ({ firstName, lastName }) => {
    try {
      const { studentId } = await API.student.register({
        body: {
          firstName,
          lastName,
        },
      })

      this.setId(studentId)

      return studentId
    } catch (error) {
      logger.error(error)

      throw error
    }

  }

  studentLogin = async ({ studentId }) => {
    try {
      const result = await API.student.login({
        id: {
          studentId,
        },
      })

      console.log(result)
      this.setId(result._id)
      return result
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  teacherRegister = () => {
  }
  teacherLogin = () => {
  }

  getRole = async () => {
    try {
      this.setState(StoreState.PENDING)
      if (this.id) {
        const roles = await API.user.role({
          id: {
            userId: this.id,
          },
        })

        console.log(roles)

        this.role = R.head(roles)
      }
      this.setState(StoreState.DONE)
    } catch (err) {
      logger.debug('UserStore get role error', err)

      this.setState(StoreState.ERROR)
    }
  }

  getInstance = () => {
    if (!this.id) {
      console.log('Нет авторизованного пользователя')

      return this
    }

    console.log('Get studentId from localStorage: ', this.id)
    if (this.role === UserRole.STUDENT) {
      return new StudentStore()
    }

    if (this.role === UserRole.TEACHER) {
      return new StudentStore()
    }

    return this
  }
}

export default UserStore
