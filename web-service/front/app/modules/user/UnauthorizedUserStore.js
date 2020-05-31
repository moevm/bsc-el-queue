import StudentStore from '@app/modules/user/StudentStore'

import { LOCAL_USER_ID, UserRole, StoreState } from '@app/constants'

import API from '@app/api'
import logger from '@app/lib/logger'
import * as R from 'ramda'
import TeacherStore from '@app/modules/user/TeacherStore'
import UserStore from '@app/modules/user/UserStore'

class UnauthorizedUserStore extends UserStore {
  constructor() {
    super()

    this.id = localStorage.getItem(LOCAL_USER_ID)
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

      const role = R.head(result.roles)
      const userData = result |> R.omit(['_id', 'roles'])

      this.setId(result._id)
      this.setRole(role)
      this.setData(userData)
      return result
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  teacherRegistration = async ({ firstName, lastName, password }) => {
    try {
      const { teacherId } = await API.teacher.register({
        body: {
          firstName,
          lastName,
          password,
        },
      })

      this.setId(teacherId)

      return teacherId
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  teacherLogin = async ({ teacherId, password }) => {
    try {
      // const result = await API.teacher.login({
      //   body: {
      //     teacherId,
      //     password
      //   },
      // })
      const result = await API.student.login({
        id: {
          studentId: teacherId,
        },
      })

      const role = R.head(result.roles)
      const userData = result |> R.omit(['_id', 'roles'])

      this.setId(result._id)
      this.setRole(role)
      this.setData(userData)
      if (result) {
        this.setId(teacherId)
      }
      return result
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  get = async () => {
    try {
      this.setState(StoreState.PENDING)
      if (this.id) {
        const result = await API.user.get({
          id: {
            userId: this.id,
          },
        })

        if (result) {
          const userData = result |> R.omit('_id')

          this.setRole(R.head(result.roles))
          this.setData(userData)
        }
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
      return new StudentStore(this.id, this.data)
    }

    if (this.role === UserRole.TEACHER) {
      return new TeacherStore(this.id, this.data)
    }

    return this
  }
}

export default UnauthorizedUserStore
