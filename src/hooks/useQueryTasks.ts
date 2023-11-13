import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Task } from "../types"
import { useError } from "./useError"

// タスク一覧を取得するためのフック
export const useQueryTasks = () => {
  // エラー処理を行うためのフック
  const { switchErrorHandling } = useError()
  const getTasks = async () => {
    // タスク一覧を取得するAPIを叩く(Get request)
    // dataにはタスク一覧が入る
    // エラーの場合dataにはエラーメッセージが入る
    const { data } = await axios.get<Task[]>(
        // 環境変数からAPIのURLを取得
        `${process.env.REACT_APP_API_URL}/tasks`,
        // cookieを送信するためのオプション
        { withCredentials: true }
    )
    // 取得したタスク一覧を返す
    return data
  }
  // react-queryのuseQueryを使ってタスク一覧を取得する
  return useQuery<Task[], Error>({
    // react-queryのキャッシュのキーを指定
    queryKey: ['tasks'],
    // タスク一覧を取得する関数を指定
    queryFn: getTasks,
    staleTime: Infinity,
    // エラーが発生した場合の処理を指定
    onError: (err: any) => {
      // エラーの内容によって処理を分岐
      if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
      } else {
          switchErrorHandling(err.response.data)
      }
    },
  })
}