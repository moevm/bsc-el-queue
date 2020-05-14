/* global USE_MOCKS */
import axios from 'axios'

import requestMock from '@app/lib/requestMock'

import logger from './logger'
import { networkErrorAsApiResponse, ApiError } from './errors'

let errorCallback = () => undefined

export const setErrorCallback = (cb) => {
  errorCallback = cb
}

const getData = async (props, hasRetriedAfterAuthentication = false) => {
  try {
    const { data } = await axios(props)

    return data
  } catch (err) {
    if (err?.hasAuthenticated && !hasRetriedAfterAuthentication) {
      return getData(props, true)
    }

    const errorMessage = err?.response?.data?.errorMessage

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (errorMessage) {
      logger.error(errorMessage)

      throw new Error(errorMessage)
    }

    throw new ApiError(networkErrorAsApiResponse(err))
  }
}

const request = async (props, { throwOnError = true } = {}) => {
  logger.debug(props)

  let data = {}

  if (USE_MOCKS) {
    try {
      const result = await requestMock(props)

      data = {
        errorCode: 0,
        errorMessage: null,
        result,
      }
    } catch (error) {
      data = {
        errorCode: error.code,
        errorMessage: error.message,
        result: null,
      }
    }
  } else {
    data = await getData(props)
  }

  if (props.responseType === 'blob') {
    return data
  }

  if (data.errorCode !== 0) {
    logger.error(data.errorMessage)

    if (throwOnError) {
      throw new ApiError(data)
    }

    if (errorCallback) {
      errorCallback(data)

      return undefined
    }
  }

  if (data.result === undefined) {
    return data
  }

  return data.result
}

export default request
