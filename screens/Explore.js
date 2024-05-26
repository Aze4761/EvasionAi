import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, ToastAndroid ,Alert,Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import SyncStorage from 'sync-storage';
import Trending from './explore_sections/trending';
import Followng from './explore_sections/followng';


const Explore = () => {
  const [follow, setFollow] = useState('block')
  const [trend, setTrend] = useState('none')
  const [show, setShow] = useState(true)
 

  following = () => {
    setTrend('none')
    setFollow('block')
    setShow(true)
  }
  trending = () => {
    setShow(false)
    setTrend('block')
    setFollow('none')
  }

  

  
  
  
  return (

    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <View style={{ flex: 2, backgroundColor: '#fff', position: 'relative' }}>
          <MaskedView style={{ top: 40, left: 25 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 22, fontWeight: 'bold' }}>EnvsisionAI</Text>}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#22E5FE', '#C859EE']}
            >
              <Text style={{ fontSize: 22, opacity: 0 }}>EnvsisionAI</Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <View style={{ flex: 2, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 2, top: 44, left: 55 }}>
              <SimpleLineIcons name="social-instagram" size={30} color="black" />
            </View>
            <View style={{ flex: 2, top: 40, backgroundColor: '#fff' }}>
              <View style={{ width: 80, }}>
                <Icon.Button
                  borderRadius={50}
                  height={38}
                  left={5}
                  name="diamond"
                  backgroundColor="#FECE5B"
                  color="red"
                  onPress={() => console.log('pressed')}>
                  <Text style={{ color: 'black', fontSize: 15, right: 7, fontWeight: 'bold', bottom: 4 }}>Pro</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.5, backgroundColor: '#FAF9F6' }} >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => following()} style={{ flex: 0.5 }}  ><Text style={{ left: 30, fontSize: 16, fontWeight: 'bold' }}>Following</Text><View
            style={{
              left: 35,
              display: follow,
              width: 60,
              top: 5,
              borderBottomColor: '#111',
              borderBottomWidth: 3,
            }}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => trending()} style={{ fex: 0.5 }}><Text style={{ right: 30, fontSize: 16, fontWeight: 'bold' }}>Trending</Text>
            <View
              style={{
                right: 25,
                display: trend,
                top: 5,
                width: 60,
                borderBottomColor: '#111',
                borderBottomWidth: 3,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {show ? <Followng /> : <Trending />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  ImgContainer1: {
    paddingTop: 20,
    paddingBottom: 60
  },
  tinyLogo:{
    top:18,
    left:40,
    borderRadius:25,
    height:50,
    width:50
  },
  item:{
    top:18,
    left: 10,
  },
  
})
export default Explore