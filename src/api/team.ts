/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  Add = '/team/add',
  Delete = '/team/delete',
  MyTeamList = '/team/list/my/create',
}

function addTeamApi(data: any): Promise<any> {
  return post(Api.Add, data)
}

function deleteTeamApi(data: any): Promise<any> {
  return post(Api.Delete, data)
}

function myTeamListApi(data: any): Promise<any> {
  return get(Api.MyTeamList, data)
}

export { addTeamApi, deleteTeamApi, myTeamListApi }
