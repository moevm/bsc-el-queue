import { action, computed, observable } from 'mobx'

import { LOCAL_USER_ID, StoreState, UserRole } from '@app/constants'

class UserStore {
  @observable id = null
  @observable data = null
  @observable role = UserRole.UNAUTHORIZED
  @observable state = StoreState.INACTIVE
  @observable queueStore = null
  @observable roomStore = null

  @action
  setId = (id) => {
    this.id = id

    localStorage.setItem(LOCAL_USER_ID, id)
  }

  @action
  setData = (data) => {
    this.data = data
  }

  @action
  setRole = (role) => {
    this.role = role
  }

  @action
  setState = (state) => {
    this.state = state
  }

  @action
  setQueueStore = (queueStore) => {
    this.queueStore = queueStore
  }

  @action
  setRoomStore = (roomStore) => {
    this.roomStore = roomStore
  }

  @computed
  get isPending() {
    return this.state === StoreState.PENDING
  }

  @computed
  get isStudent() {
    return this.role === UserRole.STUDENT
  }

  @computed
  get isTeacher() {
    return this.role === UserRole.TEACHER
  }

  @computed
  get isUnauthorized() {
    return this.role === UserRole.UNAUTHORIZED
  }
}

export default UserStore
