import { Dispatch } from 'redux'
import { ChatAction, ChatActionTypes, MessageResponseTypes, MessageTypes } from '../../types/chat'
import { getLocalToken } from  './token'
import Pusher from 'pusher-js'
import config from '../../config.json'


export const getMessages = () => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      pusherObserver(dispatch)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'произошла ошибка'
      dispatch({type: ChatActionTypes.FETCH_MESSAGES_ERROR, payload: message})
    }
  }
}

export const pusherObserver = (dispatch: Dispatch<ChatAction>) => {

  const token = JSON.parse(getLocalToken())

  const pusher = new Pusher(config.apiKey, {
    wsHost: 'api.chatapp.online',
    wssPort: 6001,
    disableStats: true,
    authEndpoint: 'https://api.chatapp.online/broadcasting/auth',
    auth: {
      headers: {
        'Authorization': token.accessToken
      }
    },
    enabledTransports: ['ws'],
    forceTLS: true
  })
  createChannels(pusher, dispatch)

}

const createChannels = (pusher: Pusher, dispatch: Dispatch<ChatAction>) => {

  let channel = pusher.subscribe('private-v1.licenses.' + config.licenseId + '.messengers.telegram')
  channel.bind('message', (data: MessageResponseTypes) => {
    const dataMessage: Array<MessageTypes> = data.payload.data
    if (dataMessage && dataMessage.length > 0) {
      setChat(dataMessage[0].chat.id)
      setMessagesList(dataMessage[0])
      dispatch({type: ChatActionTypes.FETCH_MESSAGES, payload: dataMessage})
    }
  })

}

const setChat = (chatId: string) => {
  const chats = getChats()
  let isExist = false
  chats.map((chat: string) => {
    if (chat === chatId) {
      isExist = true
    }
  })
  if (!isExist) {
    chats.push(chatId)
  }
  sessionStorage.setItem('chats', JSON.stringify(chats))
}

export const getChats = () => {
  const item = sessionStorage.getItem('chats') || ''
  return item && JSON.parse(item) || []
}

const setMessagesList = (message: MessageTypes) => {
  const chat = message.chat
  let messagesList = getMessagesList(chat.id)
  messagesList.push(message)
  sessionStorage.setItem(chat.id, JSON.stringify(messagesList))
}

export const getMessagesList = (chatId: string) => {
  const item = sessionStorage.getItem(chatId) || ''
  return item && JSON.parse(item) || []
}