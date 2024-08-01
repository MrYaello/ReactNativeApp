import React, { useLayoutEffect, useState } from 'react';

import Login from "./screens/Login";
import Scanner from "./screens/Scanner";
import Main from "./screens/Main";
import Register from './screens/Register';
import Welcome from './screens/Welcome';
import Account from './screens/Account';
import Settings from './screens/Settings';

import { config } from './config/gluestack-ui.config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './assets/Languages/LanguageContext';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <GluestackUIProvider config={config}>
      <LanguageProvider>
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{
                headerShown: false
              }}
              />

              <Stack.Screen
              name='Register'
              component={Register}
              options={{
                headerShown: false
              }}
              />

              <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerShown: false
              }}
              />
            
              <Stack.Screen
                name='Main'
                component={Main}
                options={{
                  title: "Main",
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Scanner'
                component={Scanner}
                options={{
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Account'
                component={Account}
                options={{
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Settings'
                component={Settings}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
      <StatusBar style="dark" />
    </GluestackUIProvider>
  );
}