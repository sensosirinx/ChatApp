import { MessageType } from './widget'

export enum ChatActionTypes {
  FETCH_MESSAGES = 'FETCH_MESSAGES',
  FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR',
}

export interface ChatState {
  newMessage: Array<MessageTypes> | null
  error: null | string
}

interface FetchMessagesAction {
  type: ChatActionTypes.FETCH_MESSAGES
  payload: Array<MessageTypes>
}

interface FetchMessagesErrorAction {
  type: ChatActionTypes.FETCH_MESSAGES_ERROR
  payload: string
}

export type ChatAction = FetchMessagesAction | FetchMessagesErrorAction

export type ChatsIconsProps = {
  buttonStyle: object
}

export interface MessageResponseTypes {
  payload: {
    data: Array<MessageTypes>
  },
  queue: string
}

export interface MessageTypes {
  chat: {
    hash: string
    id: string
    image: string
    imageId: string
    name: string
    phone: string
    type: string
    username: string
  }
  fromApi: boolean
  fromApp: null | string | number | boolean
  fromMe: boolean
  fromUser: object
  id: number
  isForwarded: boolean
  message: MessageType
  quotedMessage: null | string
  side: string
  time: number
  type: string
}

export interface ChatTypesProps {
  chats: [string]
}