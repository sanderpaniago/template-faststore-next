import { useGlobalUIState } from '@faststore/sdk'
import type { UIActions } from '@faststore/sdk'
import type { Dispatch } from 'react'

export interface Toast {
  message: string
  status: 'error' | 'warn' | 'info'
}

interface InitialState {
  toasts: Toast[]
}

export const uiInitialState: InitialState = {
  toasts: [],
}

export const uiActions: UIActions = {
  PUSH_TOAST: (state, data: Toast) => ({
    ...state,
    toasts: [...state.toasts, data],
  }),
  POP_TOAST: (state) => ({
    ...state,
    toasts: state.toasts.slice(1),
  }),
}

type Action = {
  type: string
  data?: unknown
}

export const uiEffects = (dispatch: Dispatch<Action>) => ({
  pushToast: (toast: Toast) => dispatch({ type: 'PUSH_TOAST', data: toast }),
  popToast: () => dispatch({ type: 'POP_TOAST' }),
})

type UIContext = ReturnType<typeof useGlobalUIState> &
  InitialState &
  ReturnType<typeof uiEffects>

export const useUI = () => useGlobalUIState() as UIContext
