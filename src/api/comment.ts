/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  AddComment = '/user/addComment',
  GetCommentList = '/user/getComment',
  GetReplyComment = '/user/getSonComment'
}

function addCommentApi( data: any ): Promise<any> {
  return post( Api.AddComment,data )
}

function getCommentListApi( data: any ): Promise<any> {
  return get( Api.GetCommentList, data )
}

export { addCommentApi, getCommentListApi }
