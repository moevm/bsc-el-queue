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
    create: apiRequest('/rooms', 'post'),
    get: apiRequest('rooms/%(roomId)s')
  },
  queue: {
    get: apiRequest('rooms/%(roomId)s/queues/%(queueId)s'),
    addUser: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s', 'post'),
    checkIsUserInQueue: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s'),
    leave: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s', 'delete'),
    applyStudent: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s/apply', 'put'),
    rejectStudent: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s/reject', 'put'),
    skip: apiRequest('rooms/%(roomId)s/queues/%(queueId)s/students/%(studentId)s/skip', 'put'),
  },
  student: {
    register: apiRequest('students', 'post'),
    login: apiRequest('students/%(studentId)s'),
  },
  teacher: {
    register: apiRequest('teachers', 'post'),
    login: apiRequest('teachers/login', 'post'),
  },
  user: {
    role: apiRequest('users/%(userId)s/role'),
    get: apiRequest('users/%(userId)s'),
  }
}

export default API
