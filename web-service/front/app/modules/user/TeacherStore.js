import { action, computed, observable } from 'mobx'

import { LOCAL_USER_ID, StoreState, UserRole } from '@app/constants'
import API from '@app/api'
import logger from '@app/lib/logger'

class TeacherStore {
  constructor(id, data) {
    this.id = id
    this.name = data?.name
  }

  @observable id = null
  @observable name = null
  @observable state = StoreState.INACTIVE
  @observable queueStore = false
  role = UserRole.TEACHER

  @action
  setId = (id) => {
    this.id = id

    localStorage.setItem(LOCAL_USER_ID, id)
  }

  @action
  setQueueStore = (queueStore) => {
    this.queueStore = queueStore
  }

  @action
  setState = (state) => {
    this.state = state
  }

  @computed
  get isPending() {
    return this.state === StoreState.PENDING
  }

  createRoom = async ({ name }) => {
    try {
      const result = await API.room.create({
        body: {
          teacherId: this.id,
          name,
        },
      })

      console.log(result)
      return result.roomId
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  applyStudent = async (studentId) => {
    await this.queueStore.applyStudent(studentId)
  }

  rejectStudent = async (studentId) => {
    await this.queueStore.rejectStudent(studentId)
  }
}

export default TeacherStore
