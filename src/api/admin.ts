/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  UserList = '/user/list/page',
  DeleteUser = '/user/delete',
  UserInfo = '/user/get/vo',
  Update = '/user/update',
  AddUser = '/user/add',
  PostList = '/post/list/page',
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

export { getUserList, deleteUser, getPostList, getUserInfo, updateUserInfo, addUser }
