/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/utils/http'

enum Api {
  UserList = '/recommend/writer',
  PostList = '/recommend/post',
}

function getRecommendUserListApi(): Promise<any> {
  return get(Api.UserList)
}

function getRecommendPostListApi(): Promise<any> {
  return get(Api.PostList)
}

export { getRecommendUserListApi, getRecommendPostListApi }
