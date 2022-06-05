import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { ChatTypesProps } from '../types/chat'
import { getChats, getMessagesList } from '../store/actions/chat'
import { getFileType, getMessageText } from '../store/actions/widget'


const ChatWindow: React.FC = () => {

  const { error } = useTypedSelector(state => state.chat)

  const chats = getChats()

  if (error) {
    return <div className="chat-window"><div className="error">{error}</div></div>
  }

  return (
    <div className="chat-window">
      <div className="chat-window-wrapper">
        {chats && chats.length > 0 ? <Chats chats={chats} /> : <div className="empty-messages">Нет сообщений</div>}
      </div>
    </div>
  )
}

export default ChatWindow

const Chats: React.FC<ChatTypesProps> = ({ chats }) => {

  const { showMessages } = useActions()

  const { messages } = useTypedSelector(state => state.messages)

  if (messages && messages.length > 0) {
    return <MessagesList/>
  }

  return (
    <>
      {chats.map((chatId) => {

        const messages = getMessagesList(chatId)
        const lastMessage = messages[messages.length - 1]
        const user = lastMessage.chat
        let text = getMessageText(lastMessage.message)

        return (
          <div id={chatId} key={chatId} className="chat-block" onClick={() => showMessages(chatId)}>
            <img src={user.image ? user.image : './assets/tg.svg'} alt={user.name} title={user.name}/>
            <div className="last-message">
              {text}
            </div>
          </div>)
      })}
    </>
  )
}

const MessagesList: React.FC = () => {

  const { messages } = useTypedSelector(state => state.messages)
  const { newMessage } = useTypedSelector(state => state.chat)
  const { typeChat } = useTypedSelector(state => state.widget)
  const { showChat } = useActions()

  if (newMessage && messages && newMessage[0].chat && newMessage[0].chat.id === messages[0].chat.id) {
    let existMessage = false
    messages.map( (message) => {
      if (message.id === newMessage[0].id) {
        existMessage = true
      }
    })
    if (!existMessage) {
      messages.push(newMessage[0])
    }
  }

  const showChatWindow = () => {
    showChat(typeChat)
  }

  return (
    <>
      <div className="go-back" onClick={showChatWindow}>Вернуться</div>
      {messages && messages.map( (message) => {

        const text = getMessageText(message.message)

        return <div key={message.id} className="message-block">
          <div className="text">
            {text}
          </div>
          {message.message.file ? <div className="file">
            {getFileType(message.message.file.link) === 'image' ?
              <img src={message.message.file.link} alt={message.message.file.name} /> :
              <a href={message.message.file.link} download={true} title={'Скачать'}>{message.message.file.name}</a>
            }
          </div> : ''}
        </div>
        }
      )}
    </>
  )
}