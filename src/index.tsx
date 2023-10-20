import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// データのキャッシュやデータの非同期取得に使用
const queryClient = new QueryClient({})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  // ReactのStrictモードを有効に、潜在的な問題を検出し、警告を表示。問題を特定しやすく
  <React.StrictMode>
    {/* React Queryを利用できるようにする */}
    <QueryClientProvider client={queryClient}>
    <App />
    {/* Devtoolsパネルを非表示に、必要に応じて表示できる */}
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
// パフォーマンスを測定し、分析、監視するために使用
