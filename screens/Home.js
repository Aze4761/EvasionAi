import { StyleSheet, Text, View } from 'react-native';
import Art from "./Art.js";
import Creation from "./Creation.js";
import Explore from "./Explore.js";
import Setting from "./Setting.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function Home(route) {

  const Tab = createBottomTabNavigator()

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      background: "#fff"
    }
  }
   
 
  return (
    
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {focused ? <MaskedView style={{top:4}} maskElement={<Feather name="globe" size={28} />}>
                    <LinearGradient
                      start={{ x: 1, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      colors={['#22E5FE', '#C859EE']}
                    >
                      <Feather name="globe" style={{opacity:0}} size={28} />
                    </LinearGradient>
                  </MaskedView> : <Feather name="globe" size={28} color='#111' />}
                  {focused ?
                    <MaskedView style={{ left: 8, top: 5 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 10 }}>Explore</Text>}>
                      <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#22E5FE', '#C859EE']}
                      >
                        <Text style={{ opacity: 0 }}>Explore</Text>
                      </LinearGradient>
                    </MaskedView> : <Text style={{ fontSize: 10, color: '#111' }}>Explore</Text>}
                </View>
              )
            }
          }} />
        <Tab.Screen
          name="Create"
          component={Art}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {focused ? <MaskedView style={{top:4}} maskElement={<MaterialCommunityIcons name="star-four-points-outline" size={28} />}>
                    <LinearGradient
                      start={{ x: 1, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      colors={['#22E5FE', '#C859EE']}
                    >
                      <MaterialCommunityIcons name="star-four-points-outline" size={28} style={{opacity:0}} />
                    </LinearGradient>
                  </MaskedView> : <MaterialCommunityIcons name="star-four-points-outline" size={28} color='#111' />}
                  {focused ?
                    <MaskedView style={{ left: 12, top: 5 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 10 }}>AI Art</Text>}>
                      <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#22E5FE', '#C859EE']}
                      >
                        <Text style={{ opacity: 0 }}>Explore</Text>
                      </LinearGradient>
                    </MaskedView> : <Text style={{ fontSize: 10, color: '#111' }}>Create</Text>}
                </View>
              )
            }
          }} />
        <Tab.Screen
          name="My_Creation"
          component={Creation}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {focused ? <MaskedView style={{ top:4}} maskElement={<Ionicons name="ios-image-outline" size={28}/>}>
                    <LinearGradient
                      start={{ x: 1, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      colors={['#22E5FE', '#C859EE']}
                    >
                      <Ionicons name="ios-image-outline" size={28} style={{opacity:0}} />
                    </LinearGradient>
                  </MaskedView> : <Ionicons name="ios-image-outline" size={28} color='#111' />}
                  {focused ?
                    <MaskedView style={{ left: 12, top: 5 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 10 }}>MyCreation</Text>}>
                      <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#22E5FE', '#C859EE']}
                      >
                        <Text style={{ opacity: 0 }}>MyCreation</Text>
                      </LinearGradient>
                    </MaskedView> : <Text style={{ fontSize: 10, color: '#111' }}>MyCreation</Text>}
                </View>
              )
            }
          }} />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {focused ? <MaskedView style={{ top:4}} maskElement={<AntDesign name="setting" size={28} />}>
                    <LinearGradient
                      start={{ x: 1, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      colors={['#22E5FE', '#C859EE']}
                    >
                      <AntDesign name="setting" size={28} style={{opacity:0}}/>
                    </LinearGradient>
                  </MaskedView> :<AntDesign name="setting" size={28} color='#111'/>}
                  {focused ?
                    <MaskedView style={{ left: 10, top: 5 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 10 }}>Setting</Text>}>
                      <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#22E5FE', '#C859EE']}
                      >
                        <Text style={{ opacity: 0 }}>Setting</Text>
                      </LinearGradient>
                    </MaskedView> : <Text style={{ fontSize: 10, color: '#111' }}>Setting</Text>}
                </View>
              )
            }
          }} />
      </Tab.Navigator>
   
  );
}


const styles = StyleSheet.create({})