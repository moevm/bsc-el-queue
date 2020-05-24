import AbstractFetchStore from '@app/lib/AbstractFetchStore'

import API from '@app/api'

export default class RoomStore extends AbstractFetchStore {
  constructor() {
    super(API.room.get)
  }
}
