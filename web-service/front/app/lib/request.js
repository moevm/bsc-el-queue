/* global USE_MOCKS */
import axios from 'axios'

import requestMock from '@app/lib/requestMock'

import logger from './logger'

const getData = async (props) => {
  try {
    const { data } = await axios(props)

    return data
  } catch (err) {
    throw new Error(err)
  }
}

const request = async (props) => {
  logger.debug(props)

  if (USE_MOCKS) {
    try {
      return await requestMock(props)
    } catch (error) {
      logger.error(error)

      throw new Error(error)
    }
  }

  return await getData(props)
}

export default request
