/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'
enum Api {
  add = '/solution/user/publish',
  addDraft = '/solution/user/addCloud',
  getSolutionInfo = '/solution/user/get',
  getSolutionList = '/solution/user/getList',
  getMySolutionList = '/solution/user/getMySolution',
  addFavour = '/solution_favour/',
  getFavourSolutionList = '/solution_favour/my/list/pageSolution',
}

// interface submitQuestionData {
//   code: string
//   language: string
//   questionId: number
// }

function addSolutionApi(data: any) {
  return post(Api.add, data)
}

function addDraftApi(data: any) {
  return post(Api.addDraft, data)
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

function favourSolutionApi(data: any) {
  return post(Api.addFavour, data)
}

function getFavourSolutionListApi(data: any) {
  return post(Api.getFavourSolutionList, data)
}

export { addSolutionApi, addDraftApi, getSolutionInfoApi, getSolutionListApi, getMySolutionListApi, favourSolutionApi, getFavourSolutionListApi }
