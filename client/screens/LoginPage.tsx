import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginPage = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HeartBeat !</Text>
      <Button
        title="Enter"
        onPress={() => navigation.navigate('MainTabs')}
        color="#ff5c5c"
      />
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
});
