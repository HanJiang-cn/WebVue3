/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from '@/utils/http'

enum Api {
  add = '/question/add',
}

function addApi(data: any) {
  return post(Api.add, data)
}

export { addApi }
