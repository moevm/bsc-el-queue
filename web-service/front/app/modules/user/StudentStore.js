import * as R from 'ramda'
import { computed } from 'mobx'

import { UserRole } from '@app/constants'
import UserStore from '@app/modules/user/UserStore'

class StudentStore extends UserStore {
  constructor(studentId, data) {
    super()

    this.id = studentId
    this.data = data
    this.role = UserRole.TEACHER
  }

  @computed
  get name() {
    return this.data?.name
  }

  @computed
  get isInQueue() {
    return this.queueStore.isStudentInQueue(this.id)
  }

  @computed
  get isAuthorized() {
    return this.id |> R.isNil |> R.not
  }

  comeInQueue = async () => {
    await this.queueStore.addStudent(this.id)
  }

  leaveQueue = async () => {
    await this.queueStore.removeStudent(this.id)
  }

  skip = async () => {
    await this.queueStore.skipStudent(this.id)
  }
}

export default StudentStore
