import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, PanResponder, GestureResponderEvent } from 'react-native';

interface Profile {
  id: string;
  name: string;
  age: string;
  bio: string;
  image: string;
}

interface TinderCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
}

const TinderCard: React.FC<TinderCardProps> = ({ profile, onSwipeLeft, onSwipeRight, onSuperLike }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e: GestureResponderEvent, gestureState: any) => {
        if (gestureState.dx > 120) {
          swipe('right');
        } else if (gestureState.dx < -120) {
          swipe('left');
        } else if (gestureState.dy < -120) {
          swipe('up');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipe = (direction: 'left' | 'right' | 'up') => {
    Animated.timing(pan, {
      toValue: {
        x: direction === 'right' ? 500 : direction === 'left' ? -500 : 0,
        y: direction === 'up' ? -800 : 0,
      },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (direction === 'right') {
        onSwipeRight();
      } else if (direction === 'left') {
        onSwipeLeft();
      } else if (direction === 'up') {
        onSuperLike();
      }
    });
  };

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false,
    }).start();
  };

  const rotateCard = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: rotateCard }],
  };

  return (
    <Animated.View {...panResponder.panHandlers} style={[styles.card, animatedStyle]}>
      <Image source={{ uri: profile.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileAge}>{profile.age + '歲'}</Text>
        <Text style={styles.profileBio}>{profile.bio}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: '70%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 2,
  },
  cardImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
  },
  cardDetails: {
    padding: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  profileAge: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#444',
  },
});

export default TinderCard;