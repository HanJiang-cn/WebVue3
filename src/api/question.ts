/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'
enum Api {
  add = '/question/add',
  delete = '/question/delete',
  edit = '/question/edit',
  get = '/question/list/page/vo',
  getMy = '/question/my/list/page/vo',
  getDetail = '/question/get/vo',
  ceshi = '/question/question_submit/list/page',
}
interface addData {
  answer: string
  question: string
  judgeCase: [{ input: string; output: string }]
  judgeConfig: {
    timeLimit: number
    stackLimit: number
    memoryLimit: number
  }
  tags: Array<string>
  title: string
}
interface editData {
  id: number
  answer: string
  question: string
}
interface getData {
  answer: string
  content: string
  current: number
  pageSize: number
  sortField: string
  sortOrder: string
  tags: string
  title: string
  id: string
}
interface getMyData {
  answer: string
  content: string
  current: number
  id: number
  pageSize: number
  sortField: string
  sortOrder: string
  tags: Array<string>
  title: string
  userId: number
}
interface getDetailData {
  id: number
}
function addApi(data: addData) {
  return post(Api.add, data)
}
function deleteApi(data: any) {
  return post(Api.delete, data)
}
function editApi(data: editData) {
  return post(Api.edit, data)
}
function getApi(data: getData) {
  return post(Api.get, data)
}
function getMyApi(data: getMyData) {
  return post(Api.getMy, data)
}
function getDetailApi(data: getDetailData) {
  return get(Api.getDetail, data)
}

function ceshiApi(data: any) {
  return post(Api.ceshi, data)
}

export { addApi, deleteApi, editApi, getApi, getMyApi, getDetailApi, ceshiApi }
