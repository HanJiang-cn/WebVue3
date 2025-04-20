/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'
enum Api {
  add = '/solution/user/publish',
  getSolutionInfo = '/solution/user/get',
  getSolutionList = '/solution/user/getList',
}

// interface submitQuestionData {
//   code: string
//   language: string
//   questionId: number
// }

function addSolutionApi(data: any) {
  return post(Api.add, data)
}

function getSolutionInfoApi(data: any) {
  return get(Api.getSolutionInfo, data)
}

function getSolutionListApi(data: any) {
  return post(Api.getSolutionList, data)
}

export { addSolutionApi, getSolutionInfoApi, getSolutionListApi }
