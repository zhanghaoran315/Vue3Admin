const BASE_URL = 'http://codercba.com:8000'
const TIME_OUT = 10000

console.log()

const { VITE_BASE_URL, VITE_TIME_OUT } = import.meta.env

export { BASE_URL, TIME_OUT }
