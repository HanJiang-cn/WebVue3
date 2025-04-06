/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  Add = '/common/upload',
}

function addFileApi(data: any): Promise<any> {
  return post(Api.Add, data)
}

export { addFileApi }
