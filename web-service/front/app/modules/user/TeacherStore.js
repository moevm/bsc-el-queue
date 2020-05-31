import { computed } from 'mobx'

import { UserRole } from '@app/constants'
import API from '@app/api'
import logger from '@app/lib/logger'
import UserStore from '@app/modules/user/UserStore'

class TeacherStore extends UserStore {
  constructor(id, data) {
    super()

    this.id = id
    this.data = data
    this.role = UserRole.TEACHER
  }

  @computed
  get name() {
    return this.data?.name
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
