import {WidgetAction, WidgetActionTypes, MessagesState} from '../../types/widget'


const initialState: MessagesState = {
  messages: null
}

export const messagesReducer = (state = initialState, action: WidgetAction): MessagesState => {
  switch (action.type) {
    case WidgetActionTypes.SHOW_MESSAGES: {
      return { messages: action.messages }
    }
    default: {
      return state
    }
  }
}
