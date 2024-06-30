import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, Button, Dimensions, Alert } from 'react-native';
import { Profile } from '../components/interfaces';
import { initProfiles } from '../components/initprofiles';

// Story interface
interface Story {
  id: string;
  username: string;
  content: string;
  image: string | null;
}

// Initialize sample posts
const initPosts: Story[] = [
  {
    id: '1',
    username: '沈在允',
    content: '今天天氣真好，出去散步了！',
    image: null,
  },
  {
    id: '2',
    username: 'Joey',
    content: 'Working on a new React Native project.',
    image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExandpZHE5Z3NqY2dlMDd2b2lpaWtjajY5cGdxZGk5NmEycHQzNWVkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2IudUHdI075HL02Pkk/giphy.webp',
  },
  // Add more posts as needed
];

const StoryScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState<Story[]>(initPosts); // State for posts
  const [storyText, setStoryText] = useState('');
  const [imageURI, setImageURI] = useState<string>('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePostStory = () => {
    if (!storyText) {
      Alert.alert('Error', 'Please enter your story text.');
      return;
    }
    
    // Logic to post story, for now adding to state
    const newPost: Story = {
      id: String(posts.length + 1),
      username: 'YourUsername', // Replace with actual username logic
      content: storyText,
      image: imageURI || null,
    };
    setPosts([newPost, ...posts]);
    setStoryText('');
    setImageURI('');
    toggleModal(); // Close modal after posting
  };

  const renderPostItem = ({ item }: { item: Story }) => {
    // Find the profile corresponding to the username
    const userProfile:Profile|undefined = initProfiles.find(profile => profile.name === item.username);
  
    return (
      <View style={styles.storyContainer}>
        <View style={styles.userContainer}>
          <Image source={{ uri: userProfile?.image || 'https://cdn-icons-png.flaticon.com/512/7381/7381253.png' }} style={styles.userImage} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.storyText}>{item.content}</Text>
          { item.image != null 
            ? item.image && <Image source={{ uri: item.image }} style={styles.storyImage} />
            : null
          }
          {}
        </View>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.heading}>Stories</Text>}
      />
      
      <TouchableOpacity style={styles.postButton} onPress={toggleModal}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write your story..."
            value={storyText}
            onChangeText={setStoryText}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter image URI..."
            value={imageURI}
            onChangeText={setImageURI}
          />
          <Button title="Post" onPress={handlePostStory} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default StoryScreen;

// Styles
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storyContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  messageContainer: {
    marginLeft: 50, // Adjust as needed for spacing between user info and message
  },
  storyText: {
    fontSize: 16,
  },
  storyImage: {
    width: width - 70,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginTop: 10,
  },
  postButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    minHeight: 50,
  },
});
