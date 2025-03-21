/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  AddPost = '/post/add',
  DeletePost = '/post/delete',
  EditPost = '/post/edit',
  GetPost = '/post/get/vo',
}

interface AddPostData {
  content: string
  tags: string[]
  title: string
}

interface DeletePostData {
  id: number
}

interface EditPostData {
  id: number
  content: string
  tags: string[]
  title: string
}

interface GetPostData {
  id: string
}

function addPostApi(data: AddPostData): Promise<any> {
  return post(Api.AddPost, data)
}

function deletePostApi(data: DeletePostData): Promise<any> {
  return post(Api.DeletePost, data)
}

function editPostApi(data: EditPostData): Promise<any> {
  return post(Api.EditPost, data)
}

function getPostApi(data: GetPostData): Promise<any> {
  return get(Api.GetPost, data)
}

export { addPostApi, deletePostApi, editPostApi, getPostApi }
