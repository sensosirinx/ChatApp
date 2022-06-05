import { MessageTypes } from './chat'

export enum WidgetActionTypes {
  TOOGLE = 'TOOGLE',
  SHOW_CHAT = 'SHOW_CHAT',
  SHOW_MESSAGES = 'SHOW_MESSAGES'
}

export interface WidgetState {
  show: boolean,
  typeChat: null | string
}

export interface MessagesState {
  messages: null | Array<MessageTypes>
}

interface ChangeWidgetStateAction {
  type: WidgetActionTypes.TOOGLE
  show: boolean
}

interface ShowWidgetChatAction {
  type: WidgetActionTypes.SHOW_CHAT
  typeChat: string | null
}

interface ShowWidgetMessagesAction {
  type: WidgetActionTypes.SHOW_MESSAGES
  messages: null | Array<MessageTypes>
}

export interface MessageType {
  caption: string
  file: null | {
    contentType: string
    link: string
    name: string
  }
  location: null | string
  text: string
}

export type WidgetAction = ChangeWidgetStateAction | ShowWidgetChatAction | ShowWidgetMessagesAction