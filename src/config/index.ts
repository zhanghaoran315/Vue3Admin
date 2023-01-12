let BASE_URL = ''
let TIME_OUT = 5000

console.log()

const { VITE_BASE_URL, VITE_TIME_OUT } = import.meta.env

BASE_URL = VITE_BASE_URL
TIME_OUT = VITE_TIME_OUT

export { BASE_URL, TIME_OUT }
