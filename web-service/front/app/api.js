import { sprintf } from 'sprintf-js'

import request from '@app/lib/request'

import { BASE_URL_PATH, API_VERSION, apiToken } from '@app/constants'

const API_PREFIX = [BASE_URL_PATH, 'api/', `v${API_VERSION}`].join('')

// Prepare url path
export const url = path => `${API_PREFIX}/${path}`

const apiRequest = (path, method = 'get') => ({ body, query, id }) => {
  const urlWithParams = sprintf(path, id)

  return request({
    method,
    url: url(urlWithParams),
    body,
    params: query,
  })
}

const API = {}

export default API
