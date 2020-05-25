import { sprintf } from 'sprintf-js'

import request from '@app/lib/request'

// import { BASE_URL_PATH } from '@app/constants'
// const API_PREFIX = [BASE_URL_PATH, 'api'].join('')
const API_PREFIX = ['http://server-test.com'].join('')

// Prepare url path
export const url = path => `${API_PREFIX}/${path}`

const apiRequest = (path, method = 'get') => ({ body, query, id }) => {
  const urlWithParams = sprintf(path, id)

  return request({
    method,
    url: url(urlWithParams),
    data: body,
    params: query,
  })
}

const API = {
  room: {
    get: apiRequest('rooms/%(roomId)s'),
  },
  queue: {
    get: apiRequest('rooms/%(roomId)s/queues/%(queueId)s'),
    addUser: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s', 'post'),
    checkIsUserInQueue: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s'),
    leave: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s', 'delete'),
    skip: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s/skip', 'put'),
  },
  student: {
    register: apiRequest('students', 'post'),
    login: apiRequest('students/%(studentId)s'),
  },
}

export default API
