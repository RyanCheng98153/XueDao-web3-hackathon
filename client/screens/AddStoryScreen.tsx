import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddStoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Story</Text>
    </View>
  );
};

export default AddStoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
