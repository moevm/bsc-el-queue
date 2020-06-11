import {
  pageRoutes,
  notFoundRouter,
  defaultPageRoute,
} from '@app/pages'

const routes = [
  {
    childRoutes: [
      ...pageRoutes,
      defaultPageRoute,
      notFoundRouter,
    ].filter(r => r.redirect || r.component || (r.childRoutes && r.childRoutes.length > 0)),
  },
]

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
const handleIndexRoute = (route) => {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex)

  if (indexRoute) {
    const first = { ...indexRoute }

    first.path = route.path
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.

    route.childRoutes.unshift(first)
  }

  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes
