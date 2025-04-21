/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'
enum Api {
  add = '/solution/user/publish',
  getSolutionInfo = '/solution/user/get',
  getSolutionList = '/solution/user/getList',
  getMySolutionList = '/solution/user/getMySolution'
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

function getMySolutionListApi(data: any) {
  return get(Api.getMySolutionList, data)
}

export { addSolutionApi, getSolutionInfoApi, getSolutionListApi, getMySolutionListApi }
