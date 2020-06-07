import * as R from 'ramda'
import { action, computed } from 'mobx'

import logger from '@app/lib/logger'

import AbstractFetchStore from '@app/lib/AbstractFetchStore'

import API from '@app/api'

export default class QueueStore extends AbstractFetchStore {
  constructor() {
    super(API.queue.get)
  }

  @computed
  get id() {
    console.log(this.data)
    return this.data?._id
  }

  @computed
  get roomId() {
    return this.data?.room_id
  }

  @computed
  get name() {
    return this.data?.name
  }

  @computed
  get students() {
    return this.data?.students
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

  applyStudent = async (studentId = this.firstStudent.id) => {
    await API.queue.applyStudent({
      id: {
        roomId: this.roomId,
        queueId: this.id,
        studentId,
      },
    })
  }

  rejectStudent = async (studentId = this.firstStudent.id) => {
    await API.queue.rejectStudent({
      id: {
        roomId: this.roomId,
        queueId: this.id,
        studentId,
      },
    })
  }

  addStudent = async (studentId) => {
    try {
      return await API.queue.addUser({
        id: {
          roomId: this.roomId,
          queueId: this.id,
          studentId,
        },
      })
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  isStudentInQueue = (studentId) => {
    return this.students
      |> R.find(R.propEq('id', studentId))
      |> R.isNil
      |> R.not
  }

  removeStudent = async (studentId) => {
    try {
      return await API.queue.leave({
        id: {
          roomId: this.roomId,
          queueId: this.id,
          studentId,
        },
      })
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  skipStudent = async (studentId) => {
    try {
      await API.queue.skip({
        id: {
          roomId: this.roomId,
          queueId: this.id,
          studentId,
        },
      })
    } catch (error) {
      logger.error(error)

      throw error
    }
  }
}
