import * as R from 'ramda'
import { action, computed, observable } from 'mobx'

import { LOCAL_USER_ID, StoreState, UserRole } from '@app/constants'

class StudentStore {
  constructor(studentId, data) {
    this.id = studentId
    this.name = data?.name
  }

  @observable id = null
  @observable name = null
  @observable state = StoreState.INACTIVE
  @observable queueStore = false
  role = UserRole.STUDENT

  @computed
  get isInQueue() {
    return this.queueStore.isStudentInQueue(this.id)
  }

  @action
  setId = (id) => {
    this.id = id

    localStorage.setItem(LOCAL_USER_ID, id)
  }

  @action
  setName = (name) => {
    this.name = name
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
