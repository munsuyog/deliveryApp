// chat.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {getConversationsByUser} from '../../../utils/firebase'; // Importing the hook to fetch conversations

const Chats = ({ navigation, userData }) => {
  const [conversations, setConversations] = useState([]);
  console.log(conversations)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userConversations = await getConversationsByUser(userData.id);
        setConversations(userConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [userData]);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { personInfo: {id: item.receiverId}, userData: {id: item.senderId} })}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>Conversation ID: {item.id}</Text>
        {/* Display other conversation details */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Chats;
