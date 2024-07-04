import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Profile, Message } from '../components/interfaces';
import { initProfiles } from '../components/initprofiles';

const ChatroomScreen: React.FC  = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>(initProfiles);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList

  // For demo, assume the current chat is with the second profile
  const currentChatProfile = profiles[1];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    // For demo purposes, add the message to state (you'll manage this differently in a real app)
    const newMessage: Message = {
      id: messages.length.toString(),
      content: inputMessage,
      senderId: profiles[0].id, // Assuming current user is the first profile in the array
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Scroll to the end of the list when a new message is sent
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={{flexDirection:'row'}}>
      <View style={[styles.messageContainer, {marginLeft:2}]}>
        {/* Display sender's name, message content, timestamp, etc. */}
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
      <Text style={{color:'#aaaaaa', alignSelf:'flex-end'}}> {item.timestamp.getHours().toString()}:{ (item.timestamp.getMinutes() < 10? "0" : "") + item.timestamp.getMinutes().toString()} </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust keyboard offset as needed for iOS
    >
      {/* Gradient background */}
      <View style={styles.gradientBackground}>
        <Image source={require('../images/chatroom/chatroomBg2.jpg')} style={styles.backgroundImage} />
      </View>

      {/* Top bar with user information */}
      <View style={styles.topBar}>
        <Image source={{ uri: currentChatProfile.image }} style={styles.profileImage} />
        <Text style={styles.profileName}>{currentChatProfile.name}</Text>
      </View>

      {/* Display chat messages */}
      <FlatList
        ref={flatListRef} // Assign the ref to FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        //inverted  // Display messages from bottom to top
      />
      
      {/* Input field for typing messages */}
      <View style={[styles.inputContainer, keyboardShown ? { marginBottom: 48 } : { marginBottom: 0 }]}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: '#fff', // Fallback color in case gradient is not supported
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cover background image
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#6866ff',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent background with white tint
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageContainer: {
    backgroundColor: '#e5e5e5',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent background with white tint
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatroomScreen;
