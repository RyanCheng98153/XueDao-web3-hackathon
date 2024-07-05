import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat, faComments, faPlusCircle, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import LoginPage from './screens/LoginPage';
import PairScreen from './screens/PairScreen';
import ChatroomScreen from './screens/ChatRoomScreen';
import AddStoryScreen from './screens/StoryScreen';
import PetScreen from './screens/PetScreen';
import ProfileScreen from './screens/ProfileScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Pair" 
        component={PairScreen} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHeartbeat} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatroomScreen} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faComments} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="AddStory" 
        component={AddStoryScreen} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPlusCircle} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Pet" 
        component={PetScreen} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPaw} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="MainTabs">
          {() => (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust as needed
            >
              <MainTabs />
            </KeyboardAvoidingView>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
