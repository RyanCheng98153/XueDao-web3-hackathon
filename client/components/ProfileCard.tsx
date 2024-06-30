import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const profiles = [
  { id: 1, name: 'John Doe', age: 25, bio: 'Likes hiking and photography' },
  { id: 2, name: 'Jane Smith', age: 28, bio: 'Enjoys reading and traveling' },
  { id: 3, name: 'Alice Brown', age: 23, bio: 'Passionate about music and art' },
  // Add more profiles as needed
];

const HomePageScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    // Handle left swipe action (dislike)
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipeRight = () => {
    // Handle right swipe action (like)
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPager: {
    flex: 1,
    width: Dimensions.get('window').width - 40, // Adjust width as needed
  },
  profileCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 20,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomePageScreen;
