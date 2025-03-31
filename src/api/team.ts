/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  Add = '/team/add',
  Join = '/team/join',
  Delete = '/team/delete',
  Quit = '/team/quit',
  MyTeamList = '/team/list/my/create',
  MyJoinTeamList = '/team/list/my/join',
}

interface QuitData {
  id: string
}

function addTeamApi(data: any): Promise<any> {
  return post(Api.Add, data)
}

function joinTeamApi(data: any): Promise<any> {
  return post(Api.Join, data)
}

function deleteTeamApi(data: any): Promise<any> {
  return post(Api.Delete, data)
}

function quitTeamApi(data: QuitData): Promise<any> {
  return post(Api.Quit, data)
}

function myTeamListApi(data: any): Promise<any> {
  return get(Api.MyTeamList, data)
}

function myJoinTeamListApi(data: any): Promise<any> {
  return get(Api.MyJoinTeamList, data)
}

export { addTeamApi, deleteTeamApi, quitTeamApi, myTeamListApi, myJoinTeamListApi, joinTeamApi }
