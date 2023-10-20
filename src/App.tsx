import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Todo } from './components/Todo'
import axios from 'axios'
import { CsrfToken } from './types'

function App() {
  useEffect(() => {
    // Cookieと認証情報をサーバーに送信し、ユーザーを認証できるように
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      // {data}にAPIから取得できたCSRFトークンを代入
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      // 全てのHTTPリクエストヘッダーにX-CSRF-Tokenを追加
      // このtoken(上記で取得した)の有無でリクエストが有効かを判断
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    // URLパスの監視や、ラウザの履歴管理のために必要
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
