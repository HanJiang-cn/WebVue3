/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  AddPost = '/post/add',
  DeletePost = '/post/delete',
  EditPost = '/post/edit',
  GetPost = '/post/get/vo',
  GetPostList = '/post/my/list/page/vo',
  ThumbPost = '/post_thumb/',
  FavourPost = '/post_favour/',
  FavourMyListPost = '/post_favour/my/list/page',
}

interface AddPostData {
  content: string
  tags: string[]
  title: string
}

interface DeletePostData {
  id: string
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

interface ThumbPostData {
  postId: number
}

interface FavourPostData {
  postId: number
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

function getPostListApi(data: any): Promise<any> {
  return post(Api.GetPostList, data)
}

function thumbPostApi(data: ThumbPostData): Promise<any> {
  return post(Api.ThumbPost, data)
}

function favourPostApi(data: FavourPostData): Promise<any> {
  return post(Api.FavourPost, data)
}

function favourMyListPostApi(data: any): Promise<any> {
  return post(Api.FavourMyListPost, data)
}

export {
  addPostApi,
  deletePostApi,
  editPostApi,
  getPostApi,
  getPostListApi,
  thumbPostApi,
  favourPostApi,
  favourMyListPostApi,
}
