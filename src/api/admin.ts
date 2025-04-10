/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get, put, del } from '@/utils/http'

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
function updateCompetition(data: any): Promise<any> {
  return put(Api.UpdateCompetition, data)
}
function deleteCompetition(data: any): Promise<any> {
  return del(Api.DeleteCompetition, data)
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
  updateCompetition,
  deleteCompetition,
  getUserCompetitionList,
}
