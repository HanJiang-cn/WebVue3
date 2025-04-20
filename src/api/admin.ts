/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get, del } from '@/utils/http'

enum Api {
  UserList = '/user/list/page',
  DeleteUser = '/user/delete',
  UserInfo = '/user/get',
  Update = '/user/update',
  AddUser = '/user/add',
  PostList = '/post/list/page',
  AddCompetition = '/competition/addCompetition',
  GetCompetition = '/competition/getCompetition',
  GetUserCompetitionList = '/competition/user/getCompetition',
  UpdateCompetition = '/competition/modifyCompetition',
  DeleteCompetition = '/competition/delCompetition',
  BannerCommunity = '/admin/getBanner',
  BannerAdd = '/admin/addBanner',
  BannerEdit = '/admin/updateBanner',
  BannerDelete = '/admin/delBanner',
  BannerPreview = '/recommend/banner',
  SolutionList = '/solution/get',
  SolutionDelete = '/solution/delete',
  SolutionUpdate = '/solution/update',
  SolutionReview = '/solution/review',
  SolutionReviewList = '/solution/getReviews',
}

interface UpdateData {
  userAvatar: string
  userName: string
  userProfile: string
}

interface AddData {
  userAccount: string
  userAvatar: string
  userName: string
  userRole: string
}

function getUserList(data: any): Promise<any> {
  return post(Api.UserList, data)
}

function deleteUser(data: any): Promise<any> {
  return post(Api.DeleteUser, data)
}

function getUserInfo(data: any): Promise<any> {
  return get(Api.UserInfo, data)
}

function updateUserInfo(data: UpdateData): Promise<any> {
  return post(Api.Update, data)
}

function addUser(data: AddData): Promise<any> {
  return post(Api.AddUser, data)
}

function getPostList(data: any): Promise<any> {
  return post(Api.PostList, data)
}

function addCompetition(data: any): Promise<any> {
  return post(Api.AddCompetition, data)
}

function getCompetition(data: any): Promise<any> {
  return get(Api.GetCompetition, data)
}

function getUserCompetitionList(data: any): Promise<any> {
  return post(Api.GetUserCompetitionList, data)
}

function deleteCompetition(data: any): Promise<any> {
  return del(Api.DeleteCompetition, data)
}

function bannerCommunity(data: any): Promise<any> {
  return post(Api.BannerCommunity, data)
}

function addBanner(data: any): Promise<any> {
  return post(Api.BannerAdd, data)
}

function editBanner(data: any): Promise<any> {
  return post(Api.BannerEdit, data)
}

function deleteBanner(data: any): Promise<any> {
  return del(Api.BannerDelete, data)
}

function bannerPreview(data: any): Promise<any> {
  return get(Api.BannerPreview, data)
}

function solutionList(data: any): Promise<any> {
  return post(Api.SolutionList, data)
}

function solutionDelete(data: any): Promise<any> {
  return del(Api.SolutionDelete, data)
}

function solutionUpdate(data: any): Promise<any> {
  return post(Api.SolutionUpdate, data)
}

function solutionReview(id: number, isApproved: boolean): Promise<any> {
  return post(`/solution/review?id=${id}&isApproved=${isApproved}`)
}

function getSolutionReviewList(data: any): Promise<any> {
  return post(Api.SolutionReviewList, data)
}
export {
  getUserList,
  deleteUser,
  getPostList,
  getUserInfo,
  updateUserInfo,
  addUser,
  addCompetition,
  getCompetition,
  editBanner,
  deleteCompetition,
  getUserCompetitionList,
  bannerCommunity,
  addBanner,
  deleteBanner,
  bannerPreview,
  solutionList,
  solutionDelete,
  solutionUpdate,
  solutionReview,
  getSolutionReviewList,
}
