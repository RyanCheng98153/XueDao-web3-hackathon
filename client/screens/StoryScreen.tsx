import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, Button, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    const userProfile: Profile | undefined = initProfiles.find(profile => profile.name === item.username);

    return (
      <View style={styles.storyContainer}>
        <View style={styles.userContainer}>
          <Image source={{ uri: userProfile?.image || 'https://cdn-icons-png.flaticon.com/512/7381/7381253.png' }} style={styles.userImage} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.storyText}>{item.content}</Text>
          {item.image && <Image source={{ uri: item.image }} style={styles.storyImage} />}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradientContainer}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.heading}>Heartbeat in life</Text>}
      />
      
      <TouchableOpacity style={styles.postButton} onPress={toggleModal}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeading}>Create a new story</Text>
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handlePostStory}>
                <Text style={styles.modalButtonText}>Post</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={toggleModal}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default StoryScreen;

// Styles
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  storyContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
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
    color: '#555',
  },
  messageContainer: {
    marginLeft: 50, // Adjust as needed for spacing between user info and message
  },
  storyText: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    minHeight: 50,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

