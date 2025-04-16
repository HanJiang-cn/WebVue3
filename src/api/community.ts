/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/utils/http'

enum Api {
  BannerList = '/recommend/banner',
  UserList = '/recommend/writer',
  PostList = '/recommend/post',
}

function getRecommendBannerListApi(): Promise<any> {
  return get(Api.BannerList)
}

function getRecommendUserListApi(): Promise<any> {
  return get(Api.UserList)
}

function getRecommendPostListApi(): Promise<any> {
  return get(Api.PostList)
}

export { getRecommendBannerListApi, getRecommendUserListApi, getRecommendPostListApi }
