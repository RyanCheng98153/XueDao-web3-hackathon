import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://yourapi.com/login', {
        email,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('jwt', token);

      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HeartBeat !</Text>
      <TouchableOpacity style={[styles.redButton, {width:'50%'}]} onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.buttonText}>Guest Enter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.loginButtonText}>Login as Account</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={[styles.modalButton, styles.jwtloginButton]} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.zkloginButton]}>
              <Text style={styles.buttonText}>Zklogin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#ff5c5c',
  },
  redButton: {
    backgroundColor: '#ff5c5c',
    padding: 6,
    borderRadius: 8,
    marginVertical: 5,
    width: '60%',
    alignItems: 'center',
  },
  loginButton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  loginButtonText: {
    color: '#bb8df8',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    color: '#ff5c5c',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#000',
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '40%',
    alignItems: 'center',
  },
  jwtloginButton: {
    backgroundColor: '#e794a5',
  },
  zkloginButton: {
    backgroundColor: '#0000ff',
  },
  closeButton: {
    backgroundColor: 'transparent'
  },
  closeButtonText: {
    color: '#272728',
    fontSize: 18,
    fontWeight: '600'
  },
});
