import { HttpSendOption } from './http.dto'

export const HTTP_DEFAULT_CONFIG: HttpSendOption = {
  url: '',
  headers: {},
  params: {},
  prefixUrl: '',
  method: 'GET',
  bodyType: 'RAW_JSON',
  mock: {
    enable: process.env.NODE_ENV === 'development',
    delay: 3000,
    log: true,
    force: false,
    copy: true
  }
}
