import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import App from './App'

import { BASE_URL_PATH } from './constants'

const getComponentRoute = (contextPath, component) => (
  <Route
    key={contextPath}
    component={component}
    path={contextPath}
    exact
  />
)

const renderRouteConfig = (Container, routes, contextPath) => {
  // Resolve route config object in React Router v3.
  const children = []

  const renderRoute = (item, routeContextPath) => {
    let newContextPath

    if (/^\//.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }

    newContextPath = newContextPath.replace(/\/+/g, '/')

    if (item.redirect) {
      const route = (
        <Route
          key={newContextPath}
          render={() => <Redirect to={item.redirect} />}
          path={newContextPath}
          exact
        />
      )

      children.push(route)
    } else if (item.component && item.childRoutes) {
      const routeConfig = renderRouteConfig(item.component, item.childRoutes, newContextPath)

      children.push(routeConfig)
    } else if (item.component) {
      const route = getComponentRoute(newContextPath, item.component)

      children.push(route)
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  routes.forEach(item => renderRoute(item, contextPath))

  // Use Switch as the default container by default
  if (!Container) {
    return <Switch>{children}</Switch>
  }

  return (
    <BrowserRouter>
        <Container key={contextPath}>
          <Switch>
            {children}
          </Switch>
        </Container>
    </BrowserRouter>
  )
}

const Root = (props) => {
  const { routeConfig } = props

  return renderRouteConfig(App, routeConfig, BASE_URL_PATH)
}

export default Root |> hot(module)
