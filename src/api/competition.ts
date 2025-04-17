/* eslint-disable @typescript-eslint/no-explicit-any */
import { post,del,get } from '@/utils/http'
enum Api {
  AddCompetition = '/competition/addCompetition',
  getCompetitionAdminList = '/competition/admin/getPreviewList',
  getCompetitionUserList = '/competition/user/getCompetition',
  updateCompetition = '/competition/modifyCompetition',
  GetCompetition = '/competition/getCompetition',
  DeleteCompetition = '/competition/delCompetition',
  IsApprovedCompetition = '/competition/adminReview',
  searchCompetition = '/competition/search',
}
function addCompetition(data: any): Promise<any> {
  return post(Api.AddCompetition, data)
}
function getCompetitionAdminListApi(data:any){
  return post(Api.getCompetitionAdminList,data)
}
function getCompetitionUserListApi(data:any){
  return post(Api.getCompetitionUserList,data)
}
function updateCompetitionApi(data:any){
  return post(Api.updateCompetition,data)
}
function getCompetition(data: any): Promise<any> {
  return post(Api.GetCompetition, data)
}
function deleteCompetition(data: any): Promise<any> {
  return del(Api.DeleteCompetition, data)
}
function isApprovedCompetition(competitionId:number, isApproved:boolean ): Promise<any> {
  return post(`/competition/adminReview?competitionId=${competitionId}&isApproved=${isApproved}`)
}
function searchCompetition(data: any): Promise<any> {
  return get(Api.searchCompetition, data)
}
export {
  addCompetition,
  getCompetitionAdminListApi,
  getCompetitionUserListApi,
  updateCompetitionApi,
  getCompetition,
  deleteCompetition,
  isApprovedCompetition,
  searchCompetition
}
