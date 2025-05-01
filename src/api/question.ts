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
  submitQuestion = '/question/question_submit/do',
  getMydetail='/question/get',
  AddCompetitionPaper='/competition/addComQues',
  dailyQuestion='/user/Index/getQuestion',
  getCompetitionQuestion='/competition/user/getComQues',
  getCompetitionQuestionDetail='/competition/user/getComQues/Info',
  historyErrorQuestion='/question/user/errorRecord',
  getEveryRecord='/question/user/getSign'
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
  question_example: [
    {
      input: string
      output: string
    }
  ]
  question_prompt: Array<string>
  difficulty: number

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
interface getMydetail{
  id:number
}
interface submitQuestionData {
  code: string
  language: string
  questionId: number
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
function getMydetailApi(data: getMydetail) {
  return get(Api.getMydetail, data)
}
function submitQuestionApi(data: submitQuestionData) {
  return post(Api.submitQuestion, data)
}

function ceshiApi(data: any) {
  return post(Api.ceshi, data)
}
function AddCompetitionPaper(competitionId:number,questionId:Array<number>){
  return post(`/competition/addComQues?competitionId=${competitionId}&questionId=${questionId}`)
}
function dailyQuestionApi(data:any){
  return get(Api.dailyQuestion,data)
}
function getCompetitionQuestionApi(competitionId:number){
  return post(`/competition/user/getComQues?competitionId=${competitionId}`)
}
function historyErrorQuestionApi(data:any){
  return post(Api.historyErrorQuestion,data)
}
function getCompetitionQuestionDetailApi(competitionId:number){
  return post(`/competition/user/getComQues/Info?competitionId=${competitionId}`)
}
function getEveryRecordApi(){
  return get(Api.getEveryRecord)
}
export { addApi, deleteApi, editApi, getApi, getMyApi, getDetailApi, ceshiApi, submitQuestionApi,getMydetailApi,AddCompetitionPaper,dailyQuestionApi ,getCompetitionQuestionApi,historyErrorQuestionApi,getCompetitionQuestionDetailApi,getEveryRecordApi}
