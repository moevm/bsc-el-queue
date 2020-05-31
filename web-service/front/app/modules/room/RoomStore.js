import { action, computed, observable } from 'mobx'

import AbstractFetchStore from '@app/lib/AbstractFetchStore'

import API from '@app/api'

export default class RoomStore extends AbstractFetchStore {
  constructor() {
    super(API.room.get)
  }

  @observable currentQueue = null

  @computed
  get id() {
    return this.data?._id
  }

  @computed
  get queues() {
    return this.data?.queues
  }

  @computed
  get teachers() {
    return this.data?.teachers
  }

  @action
  setQueues = (queues) => {
    this.data.queues = queues
  }

  @action
  setCurrentQueue = (queueId) => {
    this.currentQueue = queueId
  }

  isQueueCurrent = (queueId) => {
    return queueId === this.currentQueue
  }

  removeQueue = async (queueId) => {
    await API.queue.delete({
      id: {
        roomId: this.id,
        queueId,
      },
    })
  }

  createQueue = async ({ name }) => {
    await API.queue.create({
      id: {
        roomId: this.id,
      },
      body: {
        name,
      },
    })
  }
}
