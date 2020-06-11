import React from 'react'
import Text from '@locale'

const ErrorPage = ({ error }) => {
  let description = ''

  if (process.env.NODE_ENV !== 'production') {
    description = error.message
  }

  return (
    <React.Fragment>
      <h1>{Text.page.error.header}</h1>
      <div>{description}</div>
    </React.Fragment>
  )
}

export default ErrorPage
