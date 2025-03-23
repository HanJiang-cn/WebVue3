/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  UserList = '/user/list/page',
  DeleteUser = '/user/delete',
  PostList = '/post/list/page',
}

// interface AddPostData {
//   content: string
//   tags: string[]
//   title: string
// }

function getUserList(data: any): Promise<any> {
  return post(Api.UserList, data)
}

function deleteUser(data: any): Promise<any> {
  return post(Api.DeleteUser, data)
}

function getPostList(data: any): Promise<any> {
  return post(Api.PostList, data)
}

export { getUserList, deleteUser, getPostList }
