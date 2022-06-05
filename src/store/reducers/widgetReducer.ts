import {WidgetAction, WidgetActionTypes, WidgetState} from '../../types/widget'


const initialState: WidgetState = {
  show: false,
  typeChat: null
}

export const widgetReducer = (state = initialState, action: WidgetAction): WidgetState => {
  switch (action.type) {
    case WidgetActionTypes.TOOGLE: {
      return { show: action.show, typeChat: state.typeChat }
    }
    case WidgetActionTypes.SHOW_CHAT: {
      return { show: state.show, typeChat: action.typeChat }
    }
    default: {
      return state
    }
  }
}
