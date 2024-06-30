import React, { useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import TinderCard from '../components/TinderCard';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { initProfiles } from '../components/initprofiles';

interface Profile {
  id: string;
  name: string;
  age: string;
  bio: string;
  image: string;
}

const PairScreen: React.FC = () => {
  const testProfiles = initProfiles.concat(initProfiles).concat(initProfiles)
  const [profiles, setProfiles] = useState<Profile[]>(testProfiles);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [showBottomMessage, setShowBottomMessage] = useState<boolean>(false);

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setTimeout(() => setSwipeDirection(null), 200);
    const nextIndex = currentIndex + 1;
    if (nextIndex < profiles.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowBottomMessage(true);
    }
  };

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setTimeout(() => setSwipeDirection(null), 200);
    const nextIndex = currentIndex + 1;
    if (nextIndex < profiles.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowBottomMessage(true);
    }
  };

  const handleSwipeUp = () => {
    setSwipeDirection('up');
    setTimeout(() => setSwipeDirection(null), 200);
    const nextIndex = currentIndex + 1;
    if (nextIndex < profiles.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowBottomMessage(true);
    }
  };

  const handleDismissMessage = () => {
    setShowBottomMessage(false);
  };

  const backgroundColor = swipeDirection === 'left' ? '#5d6dab' : swipeDirection === 'right' ? '#eb8e8e' : swipeDirection === 'up' ? '#a359f2' : '#fbd7aa';

  return (
    <LinearGradient // Use LinearGradient as the container
      colors={['#FFD700', '#FF69B4']} // Gradient colors
      style={styles.container}
    >
      {currentIndex < profiles.length ? (
        <TinderCard
          key={profiles[currentIndex].id}
          profile={profiles[currentIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onSuperLike={handleSwipeUp}
        />
      ) : (
        <View style={styles.noMoreCards}>
          {showBottomMessage ? (
            <View style={styles.bottomMessage}>
              <Text style={styles.bottomMessageText}>No more profiles!</Text>
              <FontAwesome.Button
                name="smile-o"
                size={24}
                backgroundColor="transparent"
                color="#FFD700"
                onPress={handleDismissMessage}
              />
            </View>
          ) : (
            <Text>No more cards to show.</Text>
          )}
        </View>
      )}
      <View style={styles.actions}>
        <FontAwesome.Button
          name="thumbs-down"
          size={40}
          backgroundColor="transparent"
          color={swipeDirection === 'left' ? '#2261e9' : '#999'}
          onPress={handleSwipeLeft}
        />
        <FontAwesome.Button
          name="star"
          size={40}
          backgroundColor="transparent"
          color={swipeDirection === 'up' ? '#ae16dd' : '#999'}
          onPress={handleSwipeUp}
        />
        <FontAwesome.Button
          name="heart"
          size={40}
          backgroundColor="transparent"
          color={swipeDirection === 'right' ? '#f6461f' : '#999'}
          onPress={handleSwipeRight}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ece079', // Light yellow background
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomMessageText: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
  actions: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
});

export default PairScreen;