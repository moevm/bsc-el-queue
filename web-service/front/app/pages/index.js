import { BASE_URL_PATH } from '@app/constants'

import PageNotFound from './Error/PageNotFound'

import { Route as MainRoute } from './MainPage'
import { Route as RoomRoute } from './RoomPage'

import Text from '@locale'

export const pageRoutes = [
  MainRoute,

  RoomRoute,
]

export const defaultPageRoute = {
  path: BASE_URL_PATH,
  redirect: MainRoute.path,
}

export const notFoundRouter = {
  path: '*',
  name: Text.page.notFound.header,
  component: PageNotFound,
}
