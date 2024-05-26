import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ImageBackground,Image, ActivityIndicator, Modal, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react'
import SyncStorage from 'sync-storage';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import {Buffer} from "buffer";
import * as Sharing from "expo-sharing";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Art = (route) => {

  const [imgsrc, setImgsrc] = useState('')
  const [value, setValue] = useState(10);
  const [isFocus, setIsFocus] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [textPrompt, setTextPrompt] = useState('Ai Robot');
  const [imgWidth, setImgWidth] = useState(200);
  const [imgHeight, setImgHeight] = useState(200);
  const [isLoadiing, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgPath, setImgPath] = useState('icon');
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const label_data = [
    { label: 'Ten', value: 10 },
    { label: 'Twenty', value: 20 },
    { label: 'Thirty', value: 30 },
    { label: 'Fourty', value: 40 },
    { label: 'Fifity', value: 50 },
    { label: 'Sixty', value: 60 },
    { label: 'Seventy', value: 70 },
    { label: 'Eighty', value: 80 },
    { label: 'Ninety', value: 90 },
    { label: 'Hundered', value: 100 },
  ];
  const renderLabel = () => {

    if (value || isFocus) {
      return (
        <MaskedView style={{ right: 15, bottom: 10 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>Image Generation Steps</Text>}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#22E5FE', '#C859EE']}
          >
            <Text style={{ fontSize: 14, opacity: 0, paddingLeft: 20 }}>Image Generation Steps</Text>
          </LinearGradient>
        </MaskedView>
      );
    }
    return null;
  };
 
  generate = async () => {
    
    width = Number(imgWidth)
    height = Number(imgHeight)
    setIsLoading(true)
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/generate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textPrompt: textPrompt,
          Width: width,
          Height: height,
          Cfg_Scale: sliderValue,
          IGS: value
        }),
      });
      const data = await response.json();
      setImgsrc(data['content'])
      setIsLoading(false)
      const result = SyncStorage.get('Email');
      if(data['success'] === true){
      try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/ImageData', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Base64:imgsrc,
            Email: result,
            TextPromt: textPrompt,
          }),
        });;
        const data = await response.json();
        console.log(imgsrc)
        setIsLoading(false)
        if (data.success) {
          setCredentials(true)
        } else {
          setCredentials(false)
        }
      } catch (error) {
        setIsLoading(false)
        console.error(error);
      }
    }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }
  }
  

  downloadImg = async () =>{
    if (permissionResponse.status !== 'granted') {
      await requestPermission();
    }
    
    const buff = Buffer.from(imgsrc, 'base64')
    const binaryImage = buff.toString('base64')
    console.log(binaryImage)
    const path = FileSystem.documentDirectory + 'image.png';

    const result = await FileSystem.writeAsStringAsync(path, binaryImage, {
      'encoding':FileSystem.EncodingType.Base64,
    })
      .then(() => {
        console.log('Image saved to', path);
        console.log('saved')
      })
      .catch((err) => {
        console.error('Error saving image:', err);
      });
    console.log(path)
    await Sharing.shareAsync(path)
    .then(() => {
      console.log('Image shared successfully');
    })
    .catch((err) => {
      console.error('Error sharing image:', err);
    });
  
  }
 
 
  return (
    <ScrollView
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>

      <View style={{ flex: 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
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
      <View style={{ flex: 3, paddingTop: 60 }} >
        <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>Enter the text prompt that you would like to be displayed as image</Text>}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#22E5FE', '#C859EE']}
          >
            <Text style={{ fontSize: 14, opacity: 0, paddingLeft: 20 }}>Enter the text prompt that you would like to be displayed as image</Text>
          </LinearGradient>
        </MaskedView>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={120}
          placeholder="Text Prompt"
          onChangeText={newText => setTextPrompt(newText)}
          style={styles.TextArea}
        />
      </View>

      <View style={{ flexDirection: 'row', paddingTop: 30, flex: 3, width: '300px' }}>
        <View style={{ width: '50%' }}>
          <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>Enter Width</Text>}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#22E5FE', '#C859EE']}
            >
              <Text style={{ fontSize: 14, opacity: 0, paddingLeft: 20 }}>Enter Width</Text>
            </LinearGradient>
          </MaskedView>
          <TextInput
            style={styles.widthinput}
            onChangeText={newText => setImgWidth(newText)}
            placeholder="Image Width"
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: "50%" }}>
          <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>Enter Height</Text>}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#22E5FE', '#C859EE']}
            >
              <Text style={{ fontSize: 14, opacity: 0, paddingLeft: 20 }}>Enter Height</Text>
            </LinearGradient>
          </MaskedView>
          <TextInput
            style={styles.widthinput}
            onChangeText={newText => setImgHeight(newText)}
            placeholder="Image Height"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ flex: 2, paddingTop: 50, paddingLeft: 15 }} >
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#22E5FE' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={label_data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Imageneration Steps' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? '#C859EE' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <View style={{ flex: 2, flexDirection: 'Column', paddingTop: '30' }}>
        <View style={{ paddingTop: 30 }}>
          <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>Image Generation Guidence Scale</Text>}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#22E5FE', '#C859EE']}
            >
              <Text style={{ fontSize: 14, opacity: 0, paddingLeft: 20 }}>Image Generation Guidence Scale</Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#C859EE"
          maximumTrackTintColor="#000000"
          thumbTintColor='#22E5FE'
          onValueChange={setSliderValue}
          style={{ flex: 1, height: 70, padding: 10, }}
          step={0.5}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#22E5FE' }}>{sliderValue}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 3, paddingBottom: 30 }} >

              {isLoadiing ? <View style={{ top: 60 }}><ActivityIndicator color="#00B4D8" size="large" /></View> : imgsrc && (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <MaskedView style={{ bottom: 10, left: 100, marginBottom: 20 }} maskElement={<Text style={{ width: 200, backgroundColor: 'transparent', fontSize: 16, fontWeight: 'bold', paddingLeft: 20 }}>Generated Image</Text>}>
                      <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#22E5FE', '#C859EE']}
                      >
                        <Text style={{ width: 200, fontSize: 16, opacity: 0, paddingLeft: 20 }}>Generated Image</Text>
                      </LinearGradient>
                    </MaskedView>
                    <Pressable style={{ left: 120, bottom: 8 }} onPress={() => setModalVisible(!modalVisible)}>
                      <Ionicons name="close" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: 'data:image/png;base64,' + imgsrc,
                    }}
                    alt='Image'
                  />
                  <View style={{width:350,justifyContent:'center',alignItems:'center',paddingTop:40}}>
                  <TouchableOpacity  onPress={()=>downloadImg()}><MaterialCommunityIcons name="image-move" size={34} color="#22E5FE" /></TouchableOpacity>
                  <Text style={{fontSize:16,fontWeight:'bold',color:'#C859EE'}}>Share it</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      
      <View style={{ flex: 2, paddingBottom: 80, justifyContent: 'center', alignItems: 'center' }} >
        <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true); generate() }}>
          <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold' }}>Generate.</Text>}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#22E5FE', '#C859EE']}
            >
              <Text style={{ fontSize: 14, opacity: 0 }}>Generate.</Text>
            </LinearGradient>
          </MaskedView>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 350,
    height: 600,
    
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tinyLogo: {
    width: 350,
    height: 400,
    alignSelf: 'center',
    paddingTop: 25
  },
  TextArea: {
    margin: 12,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#C859EE',
    padding: 10,
  },
  widthinput: {
    height: 40,
    margin: 12,
    width: '85%',
    borderWidth: 2,
    borderColor: '#C859EE',
    borderRadius: 10,
    padding: 10,
  },
  dropdown: {
    width: 330,
    height: 50,
    borderColor: '#C859EE',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    paddingTop: 10,
    left: 10,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#22E5FE'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#BFE6FB',
    height: 50,
    width: 200,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#22E5FE',
    justifyContent: 'center',
    alignItems: 'center'
  },

});
export default Art