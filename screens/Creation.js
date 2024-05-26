import { View, Text, StyleSheet, ActivityIndicator, ScrollView,Image, TouchableOpacity,ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import SyncStorage from 'sync-storage';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const Creation = ({ navigation }) => {
  const [isLoadiing, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState(true);
  const isFocused = useIsFocused();
  const [imgData, setImgData] = useState()
  const [error, setError] = useState(false);  
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();


  myCreation = async () => {
    const result = SyncStorage.get('Email');
    try {
      setCredentials(true)
      setIsLoading(false)
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'/Creation', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: result,
        }),
      });;
      const data = await response.json();
      setImgData(data)

      setIsLoading(true)
      
      if (data.length === 0) {
        setCredentials(false)
      } else {
        
   
      }
    } catch (error) {
      setIsLoading(false)
      setError(true)
      console.log(error);
    }
  }

  downloadImg = async (val) =>{
    if (permissionResponse.status !== 'granted') {
      await requestPermission();
    }
    const fileName = 'image.png'
    const imgPath = await 'https://th.bing.com/th/id/R.1b6be693d7b4d0fb93093c8aad44c316?rik=cI0NYpWKzsWfxQ&pid=ImgRaw&r=0'
    const result = await FileSystem.downloadAsync(imgPath,
    FileSystem.documentDirectory + fileName )
    console.log(result)
    save (result.uri)
    
  }

  const save = (uri) =>{
    shareAsync(uri)
  }
  React.useEffect(() => {
    if (isFocused) {
      setError(false)
      myCreation()
    }
  }, [isFocused])
  return (
    <>
    <ScrollView style={{marginBottom:20}} >
      <View style={styles.container}>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center',paddingBottom:30 }}>
        <MaskedView style={{ top: 40, }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 24, fontWeight: 'bold' }}>EnvsisionAI.</Text>}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#22E5FE', '#C859EE']}
          >
            <Text style={{ fontSize: 24, opacity: 0 }}>EnvsisionAI.</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      {imgData ? <View style={styles.ImgContainer1}>
          {credentials ? <View ><Text >
          {imgData.map((item) => {
            return (
              <View style={styles.ImgContainer2}>
                {/*<Text style={styles.item}>{item.Email}</Text>*/}
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: 'data:image/png;base64,' + item.Base64,
                  }}
                  alt='Image'
                />
                <Text style={[styles.item,{textAlign:'center'}]}>{item.TextPrompt}</Text>
              </View>
            );
          })} </Text></View> : <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{paddingTop:280}}><Text style={{fontSize:18,color:'#22E5FE'}}>Generate Image First</Text></TouchableOpacity>}</View> : <View style={{paddingTop:280}}><ActivityIndicator color="#22E5FE" size="large" /></View>}
      </View>
      {error ? <View style={{alignItems:'center',justifyContent:'center',paddingTop:40}}>
                <Text style={{color:'red',fontSize:16,textDecorationLine:'underline'}}>Make sure internet connection stable</Text>
            </View>:''
            }
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  ImgContainer2:{
    width:400,
    height:450,
    paddingTop:30,
    paddingBottom:20,
    borderRadius:10,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 7,
  },
  ImgContainer1:{
    paddingTop:20,
    paddingBottom:60
  },
  item: {
    padding: 10,
    fontSize: 15,
    marginTop: 5,
    textAlign:'center'
  },
  tinyLogo: {
    width: 350,
    height: 350,
    alignSelf: 'center'
  },
});
export default Creation