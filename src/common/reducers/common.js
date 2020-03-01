import { handleActions } from 'redux-actions'
import * as actions from '../actions/common'

export const defaultState = {
  language: 'vi',
  timeout: 30000,
  user: null,
  setting: {}
}

const handlers = {
  [actions.clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setUser]: (state, action) => ({
    ...state,
    user: action.payload.user,
    token: action.payload.token
  }),
}

export default handleActions(handlers, defaultState)
