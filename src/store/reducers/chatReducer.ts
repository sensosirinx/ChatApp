import { ChatAction, ChatActionTypes, ChatState } from '../../types/chat'


const initialState: ChatState = {
  newMessage: null,
  error: null
}

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ChatActionTypes.FETCH_MESSAGES: {
      return { error: null, newMessage: action.payload}
    }
    case ChatActionTypes.FETCH_MESSAGES_ERROR: {
      return {error: action.payload, newMessage: null}
    }
    default: {
      return state
    }
  }
}
