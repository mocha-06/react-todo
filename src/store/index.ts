import { create } from 'zustand'
// 状態管理ライブラリ、カスタムフックを使用して状態を定義し、コンポーネント内でそれらの状態を利用できるように

type EditedTask = {
  id: number
  title: string
}

// void 返り値なし
type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

// createでuseStoreカスタムフックの作成
// setは状態を更新するための関数
const useStore = create<State>((set) => ({
  // editedTaskの初期値
  editedTask: { id: 0, title: '' },
  // set 関数を使用して editedTask の状態を更新
  updateEditedTask: (payload) =>
  set({
    editedTask: payload,
  }),
  // editedTask の状態を初期値にリセットする関数
  resetEditedTask: () => set({ editedTask: { id: 0, title: '' } }),
}))

export default useStore