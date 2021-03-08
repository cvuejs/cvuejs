import { HttpSendOption } from '../http.dto'

export interface MockRule {
  method: string
  url: string
  res: object | string | number | ((option: HttpSendOption) => any)
}
