import {Dispatch} from 'redux'
import {MessageType, WidgetAction, WidgetActionTypes} from '../../types/widget'
import {getMessagesList} from './chat'


export const toggleWidgetIcons = (show?: boolean) => {
  return (dispatch: Dispatch<WidgetAction>) => {
    dispatch({type: WidgetActionTypes.TOOGLE, show: !show})
  }
}

export const showChat = (typeChat?: string | null) => {
  return (dispatch: Dispatch<WidgetAction>) => {
    if (!typeChat) {
      typeChat = null
    }
    dispatch({type: WidgetActionTypes.SHOW_CHAT, typeChat: typeChat})
    dispatch({type: WidgetActionTypes.SHOW_MESSAGES, messages: null})
  }
}

export const showMessages = (chatId: string) => {
  return (dispatch: Dispatch<WidgetAction>) => {
    const messages = getMessagesList(chatId)
    dispatch({type: WidgetActionTypes.SHOW_MESSAGES, messages: messages})
  }
}

export const getMessageText = (message: MessageType) => {
  let text = ''
  if (message.text) {
    text = message.text
  } else if (message.caption) {
    text = message.caption
  } else if (message.file) {
    text = message.file.name
  }
  return text
}

export const getFileType = (url: string) => {
  const chunks = url.split('.')
  const ext = chunks[chunks.length - 1]
  if (['png', 'jpg', 'gif', 'jpeg'].indexOf(ext) !== -1) {
    return 'image'
  }
  return 'doc'
}