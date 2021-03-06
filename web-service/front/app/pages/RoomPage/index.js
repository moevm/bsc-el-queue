import Text from '@locale'

import RoomPage from './RoomPage'

export const Route = {
  path: '/rooms/:roomId',
  name: Text.page.main.header,
  component: RoomPage,
  getUrl: ({roomId}) => `/rooms/${roomId}`,
}

export default RoomPage
