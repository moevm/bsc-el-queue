import * as R from 'ramda'
import { action, computed } from 'mobx'

import AbstractFetchStore from '@app/lib/AbstractFetchStore'

import API from '@app/api'

export default class QueueStore extends AbstractFetchStore {
  constructor() {
    super(API.queue.get)
  }

  @action
  setStudents = (students) => {
    this.data.students = students
  }

  @computed
  get firstStudent() {
    return this.data?.students
    |> R.defaultTo([])
    |> R.head
  }
}
