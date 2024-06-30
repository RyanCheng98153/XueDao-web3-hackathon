import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileScreenProps {}

interface ProfileScreenState {
  editMode: boolean;
  name: string;
  age: number | null;
  gender: 'Male' | 'Female' | 'Other' | null;
  introduction: string;
  petInteractionRecord: number;
  petLevel: number;
  photoUrl: string | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [state, setState] = useState<ProfileScreenState>({
    editMode: false,
    name: 'John Doe',
    age: 25,
    gender: 'Male',
    introduction: 'Hello, I am John Doe.',
    petInteractionRecord: 10,
    petLevel: 5,
    photoUrl: null, // Placeholder for photo URL
  });

  const toggleEditMode = () => {
    setState({ ...state, editMode: !state.editMode });
  };

  const handleSave = () => {
    // Implement save functionality for edited data
    setState({ ...state, editMode: false }); // Exit edit mode after saving
  };

  return (
    <LinearGradient
      colors={['#ffedbc', '#ed4264']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {state.editMode ? (
          <View style={styles.editContainer}>
            <Text style={styles.header}>Edit Profile</Text>
            {/* Replace TextInput with your input fields */}
            <TextInput
              style={styles.input}
              value={state.name}
              onChangeText={(text) => setState({ ...state, name: text })}
              placeholder="Enter your name"
            />
            <TextInput
              style={styles.input}
              value={state.age ? state.age.toString() : ''}
              onChangeText={(text) =>
                setState({ ...state, age: text ? parseInt(text) : null })
              }
              placeholder="Enter your age"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={state.gender || ''}
              onChangeText={(text) =>
                setState({ ...state, gender: text as 'Male' | 'Female' | 'Other' | null })
              }
              placeholder="Enter your gender"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={state.introduction}
              onChangeText={(text) => setState({ ...state, introduction: text })}
              placeholder="Introduce yourself"
              multiline
            />
            {/* Add more TextInput fields for other data */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewContainer}>
            <Text style={styles.header}>Profile</Text>
            {state.photoUrl ? (
              <Image source={{ uri: state.photoUrl }} style={styles.profileImage} />
            ) : (
              <Image
                source={require('../images/avatar.jpeg')}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.profileText}>Name: {state.name}</Text>
            <Text style={styles.profileText}>Age: {state.age}</Text>
            <Text style={styles.profileText}>Gender: {state.gender}</Text>
            <Text style={styles.profileText}>Introduction: {state.introduction}</Text>
            <Text style={styles.profileText}>
              Pet Interaction Record: {state.petInteractionRecord}
            </Text>
            <Text style={styles.profileText}>Pet Level: {state.petLevel}</Text>
            <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
              <Icon name="pencil" type="font-awesome" size={20} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent to let the gradient show
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text
  },
  editContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background (changed to pure white)
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9', // Light grayish background for inputs
  },
  saveButton: {
    backgroundColor: '#007bff', // Blue save button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff', // White text
    fontSize: 16,
    textAlign: 'center',
  },
  viewContainer: {
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#ffffff', // White background for profile view
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666', // Medium gray text
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent', // Transparent background for a subtle appearance
    padding: 10,
    borderRadius: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default ProfileScreen;
