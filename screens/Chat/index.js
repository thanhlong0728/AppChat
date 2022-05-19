import React, { useState, useCallback, useLayoutEffect , useContext , useEffect , useRef } from 'react'
import { GiftedChat , Send } from 'react-native-gifted-chat'
import { chatModel , userModel } from '../../model'
import { useRoute } from '@react-navigation/native'
import { IconStyle } from '../../components'

import { AuthContext } from '../../navigation/AuthProvider'
import styles from './styles'

const ChatScreen = () => {
  const route = useRoute()
  const { user } = useContext(AuthContext)
  const { displayName, email, photoURL } = user
  const [messages, setMessages] = useState([]);
  const [collectionName, setCollectionName] = useState(`${route.params.name}-${route.params.id.toString()}`);
  const isStart = useRef(true)

  useEffect(() => {
    const result =  userModel.connect(collectionName)
    return () => {
      result
    }
  }, [])

  useLayoutEffect(() => {
    if(isStart.current){
      chatModel.listData(collectionName,(massage) => ( setMessages(massage)))
    }
    return () => {
      isStart.current = false
    }
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    chatModel.addData(messages[0],collectionName)
  }, [])

  const renderSend = (props) => {
    return (
      <Send {...props}>
          <IconStyle name={'send'} />
      </Send>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id   : email,
        name  : displayName,
        avatar: photoURL,
      }}
      renderUsernameOnMessage={true}
      scrollToBottom
      alignTop
      alwaysShowSend
      renderSend={renderSend}
    />
  )
}

export default ChatScreen
