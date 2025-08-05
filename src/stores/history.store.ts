import { create } from 'zustand'

type Command = {
  execute: () => void
  undo: () => void
}

interface State {
  history: Command[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
}

interface Actions {
  executeCommand: (command: Command) => void
  undo: () => void
  redo: () => void
}

export const useHistoryStore = create<State & Actions>((set, get) => ({
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,

  executeCommand: (command: Command) => {
    const { history, historyIndex } = get()
    const newHistory =
      historyIndex < history.length - 1
        ? history.slice(0, historyIndex + 1)
        : history

    command.execute()

    const updatedHistory = [...newHistory, command]
    const updatedIndex = updatedHistory.length - 1

    set({
      history: updatedHistory,
      historyIndex: updatedIndex,
      canUndo: true,
      canRedo: updatedIndex < updatedHistory.length - 2,
    })
  },
  undo: () => {
    const { history, historyIndex } = get()

    if (historyIndex >= 0) {
      const command = history[historyIndex]
      command.undo()

      set({
        historyIndex: historyIndex - 1,
        canUndo: historyIndex > 0,
        canRedo: true,
      })
    }
  },
  redo: () => {
    const { history, historyIndex } = get()

    if (historyIndex + 1 < history.length) {
      const command = history[historyIndex + 1]
      command.execute()

      set({
        historyIndex: historyIndex + 1,
        canUndo: true,
        canRedo: historyIndex < history.length - 2,
      })
    }
  },
}))
