import * as R from 'ramda'
import { computed } from 'mobx'

import logger from '@app/lib/logger'

import UserStore from '@app/modules/user/UserStore'

import { UserRole } from '@app/constants'
import API from '@app/api'

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

  @computed
  get teacherAllowed() {
    return this.roomStore.teachers |> R.includes(this.id)
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

  addTeacher = async (teacherId) => {
    await this.roomStore.addTeacher(teacherId)
  }
}

export default TeacherStore
