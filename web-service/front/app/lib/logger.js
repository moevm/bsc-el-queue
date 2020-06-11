import loglevel from 'loglevel'

const logger = loglevel.getLogger('default')

logger.setLevel(process.env.NODE_ENV === 'production' ? 'WARN' : 'DEBUG')

export const pipelog = (...args) => (value) => {
  logger.debug(...args, value)

  return value
}

export default logger
