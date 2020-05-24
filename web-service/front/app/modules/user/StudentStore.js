import * as R from 'ramda'
import { action, computed, observable } from 'mobx'

import API from '@app/api'
import logger from '@app/lib/logger'

class StudentStore {
  @observable studentId = null
  @observable name = null

  @action
  setId = (id) => {
    this.studentId = id
  }

  @action
  setName = (name) => {
    this.name = name
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
}

export default StudentStore
