import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

type Status = 'Awake' | 'Sleeping' | 'Eating' | 'Playing' | 'Happy';

const PetScreen: React.FC = () => {
  const [status, setStatus] = useState<Status>('Awake');
  const [hunger, setHunger] = useState<number>(50);
  const [happiness, setHappiness] = useState<number>(50);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [experience, setExperience] = useState<number>(0);
  const [petLevel, setPetLevel] = useState<number>(1);
  const [nextLevelExperience, setNextLevelExperience] = useState<number>(100);

  const petCardRef = useRef<View>(null);

  const feedPet = () => {
    setHunger(prevHunger => Math.max(0, prevHunger - 10));
    setHappiness(prevHappiness => prevHappiness + 5);
    setStatus('Eating');
    increaseExperience(20);
  };

  const petPet = () => {
    setHappiness(prevHappiness => Math.min(100, prevHappiness + 10));
    setStatus('Happy');
  };

  const sleepPet = () => {
    setStatus('Sleeping');
    setTimeout(() => {
      setStatus('Awake');
      setHunger(prevHunger => Math.min(100, prevHunger + 10));
    }, 3000);
  };

  const playPet = () => {
    setStatus('Playing');
    setTimeout(() => {
      setStatus('Awake');
      increaseExperience(10);
    }, 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const increaseExperience = (amount: number) => {
    const newExperience = experience + amount;
    setExperience(newExperience);
    if (newExperience >= nextLevelExperience) {
      levelUp();
    }
  };

  const levelUp = () => {
    setPetLevel(prevLevel => prevLevel + 1);
    setExperience(0);
    setNextLevelExperience(nextLevelExperience * 2);
  };

  const petImageSource = (() => {
    switch (status) {
      case 'Sleeping': return require('../images/virtualPet/sleeping.jpg');
      case 'Eating': return require('../images/virtualPet/eating.jpg');
      case 'Playing': return require('../images/virtualPet/playing.jpg');
      case 'Happy': return require('../images/virtualPet/petting.jpg');
      default: return require('../images/virtualPet/awake.jpeg');
    }
  })();

  const experienceProgress = experience / nextLevelExperience;

  const handleLongPress = async () => {
    if (petCardRef.current) {
      try {
        const uri = await captureRef(petCardRef, {
          format: 'png',
          quality: 1,
        });
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          await MediaLibrary.createAssetAsync(uri);
          Alert.alert('Success', 'Pet card info saved to your gallery!');
        } else {
          Alert.alert('Permission Denied', 'Media library permission is required to save images.');
        }
      } catch (error) {
        console.error('Failed to save image', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adorable Pet Panda</Text>
      <TouchableOpacity onPress={toggleFullscreen} onLongPress={handleLongPress}>
        <View ref={petCardRef} style={styles.petContainer}>
          <Image source={petImageSource} style={styles.petImage} />
          <Text style={styles.petStatus}>Status: {status}</Text>
          <Text style={styles.petInfo}>Hunger: {hunger}</Text>
          <Text style={styles.petInfo}>Happiness: {happiness}</Text>

          <View style={styles.levelBar}>
            {[1, 2, 3, 4, 5].map(level => (
              <View
                key={level}
                style={[
                  styles.levelBarItem,
                  { backgroundColor: level <= petLevel ? '#2196F3' : '#CCCCCC' },
                ]}
              />
            ))}
            <Text style={styles.levelText}>Level: {petLevel}</Text>
          </View>

          <View style={styles.experienceBar}>
            <View style={styles.experienceBarFillContainer}>
              <View
                style={[styles.experienceBarFill, { width: `${experienceProgress * 100}%` }]}
              />
            </View>
          </View>
          <Text style={styles.experienceText}>Experience: {experience} / {nextLevelExperience}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isFullscreen} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={toggleFullscreen}>
            <Image source={petImageSource} style={styles.fullscreenImage} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={feedPet}>
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={petPet}>
          <Text style={styles.buttonText}>Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sleepPet}>
          <Text style={styles.buttonText}>Sleep</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={playPet}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aaffdd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  petContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  petImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  petStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  petInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullscreenImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  levelBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  levelBarItem: {
    width: 20,
    height: 8,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  levelText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  experienceBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  experienceBarFillContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 5,
    overflow: 'hidden',
  },
  experienceBarFill: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  experienceText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
});

export default PetScreen;
