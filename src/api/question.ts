import { post,get } from '@/utils/http'

enum Api {
  add = '/question/add',
  delete = '/question/delete',
  edit = '/question/edit',
  get = '/question/get',
}
interface addData {
  answer: string
  question: string
  judgeCase:[
    {input: string, output: string}
  ]
  judgeConfig: {
    timeLimit: number
    stackLimit: number
    memoryLimit: number
  }
  tags:Array<string>
  title: string
}
interface deleteData {
  id: number
}
interface editData {
  id: number
  answer: string
  question: string
}
interface getData {
  id: string
}
function addApi(data: addData) {
  return post(Api.add, data)
}
function deleteApi(data: deleteData) {
  return post(Api.delete, data)
}
function editApi(data: editData) {
  return post(Api.edit, data)
}
function getApi(data: getData) {
  return get(Api.get, data)
}
export { addApi, deleteApi, editApi, getApi }
