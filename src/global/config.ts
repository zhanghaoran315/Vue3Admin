const { VITE_BASE_URL, VITE_TIME_OUT } = import.meta.env

const config = {
  systemName: 'Vue3Admin',
  BASE_URL: '',
  TIME_OUT: 5000,
  avatarUploadUrl: 'http://localhost:5000/upload/avatar'
}

config.BASE_URL = VITE_BASE_URL
config.TIME_OUT = VITE_TIME_OUT

export default config
