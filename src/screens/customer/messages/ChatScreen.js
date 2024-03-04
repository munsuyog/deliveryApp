import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useChatMessages } from '../../../utils/firebase';

const ChatScreen = ({route, navigation}) => {
    const {userData, personInfo} = route.params;
    console.log(personInfo.id)
    console.log(userData)
    const { messages, sendMessage } = useChatMessages(userData.id, personInfo.id);

    const onSend = (newMessages = []) => {
        const { text, user } = newMessages[0]; // Assuming only one message is sent at a time
        sendMessage(user._id, personInfo.id, text);
    };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
            <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: userData.id,
      }}
    />
    </View>
  );
};

export default ChatScreen;
