import AbstractFetchStore from '@app/lib/AbstractFetchStore'

import API from '@app/api'

export default class QueueStore extends AbstractFetchStore {
  constructor() {
    super(API.queue.get)
  }
}
