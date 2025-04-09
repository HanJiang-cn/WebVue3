/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'
enum Api {
  add = '/solution/user/publish',
}

// interface submitQuestionData {
//   code: string
//   language: string
//   questionId: number
// }

function addSolutionApi(data: any) {
  return post(Api.add, data)
}

export { addSolutionApi }
