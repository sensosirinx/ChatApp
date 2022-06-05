import { combineReducers } from 'redux'
import { chatReducer } from './chatReducer'
import { tokenReducer } from './tokenReducer'
import { widgetReducer } from './widgetReducer'
import { messagesReducer } from './messagesReducer'


export const rootReducer = combineReducers({
  chat: chatReducer,
  token: tokenReducer,
  widget: widgetReducer,
  messages: messagesReducer
})

export type RootState = ReturnType<typeof rootReducer>
