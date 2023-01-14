import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUTCString(utcString: string, fmt = DEFAULT_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(fmt)
}

export function formatTimestamp(timestamp: number, fmt = DEFAULT_FORMAT) {
  if (String(timestamp).length === 13) {
    return dayjs(timestamp).format(fmt)
  } else {
    return dayjs.unix(timestamp).format(fmt)
  }
}
