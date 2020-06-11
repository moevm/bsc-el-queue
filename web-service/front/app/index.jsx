import React from 'react'
import { render } from 'react-dom'

import routeConfig from './routeConfig'
import Root from './Root'

render(
  <Root routeConfig={routeConfig} />,
  document.getElementById('root'),
)
