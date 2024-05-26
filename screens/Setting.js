import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import SyncStorage from 'sync-storage';
import { Ionicons } from '@expo/vector-icons';


const Setting = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setconfPass] = useState('');
  const [checkpass, setCheckPass] = useState(false);
  const [validatepassword, setValidatePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [profileData, setProfileData] = useState('')
  const [editProfile, setEditProfle] = useState(false)
  const [imgWidth, setImgWidth] = useState('');
  const [imgHeight, setImgHeight] = useState('');
  const [textPrompt, setTextPrompt] = useState('');
  const [editButton, setEditButton] = useState(true);

  Logout = async () => {
    await SyncStorage.remove('Email');
    navigation.navigate('Login')
  }

  updatePass = async () => {
    if (newPass !== confPass) {
      setCheckPass(true)
      return
    } else {
      setCheckPass(false)
      const result = SyncStorage.get('Email');
      setMsg('')
      setIsLoading(true)
      try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/UpdatePass', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: result,
            currentPass: curPass,
            updatedPassword: newPass,
          }),
        });
        const data = await response.json();
        if (data.success) {
          console.log('good')
          setMsg(data.msg)
          setIsLoading(false)
          setCurPass('')
          setNewPass('')
          setconfPass('')
        } else {
          setMsg(data.msg)
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        console.error(error);
      }
    }
  }

  profile = async () => {
    const result = SyncStorage.get('Email');
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/profile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: result,
        })
      });;
      const data = await response.json();
      setProfileData(data)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }
  editUserProfile = async()=>{
    const result = SyncStorage.get('Email');
    if(imgHeight === ''){
      setImgHeight(profileData[0]['Last_Name'])
    }
    if(imgWidth === ''){
      setImgWidth(profileData[0]['First_Name'])
    }
    if(textPrompt === ''){
      setTextPrompt(profileData[0]['User_Name'])
    }
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/updateProfile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: result,
          First_Name: imgWidth,
          Last_Name: imgHeight,
          User_Name: textPrompt
        }),
      });;
      const data = await response.json();
      if(data.success){
      setEditButton(true)
      setEditProfle(false)
      profile()
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  validatePass = (val) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const isValid = re.test(val)
    if (!isValid) {
      setValidatePassword('Password may be * characyer long ,at least one letter, one number and one special character')
    } else {
      setValidatePassword('')
    }
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
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', paddingBottom: 30 }}>
        <MaskedView style={{ top: 0, }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 24, fontWeight: 'bold' }}>Settings.</Text>}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#22E5FE', '#C859EE']}
          >
            <Text style={{ fontSize: 24, opacity: 0 }}>Settings.</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={{ flex: 2 }} >
        <View
          style={{ flexDirection: 'Column' }}>
          <TouchableOpacity onPress={() => { setModalVisible(true); profile() }}
            style={{ flexDirection: 'row', top: 25, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#ccc' }}>
            <Feather name="user" size={36} color="black" style={{ left: 30 }} />
            <Text style={{ fontSize: 18, left: 40, top: 7 }}>Profile</Text>
            <AntDesign name="right" size={30} color="black" style={{ left: 190, top: 7 }} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <Pressable style={{ left: 130, bottom: 5 }} onPress={() => {setModalVisible(!modalVisible); setEditProfle(false); setEditButton(true) }}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
              {profileData ? <View style={styles.ImgContainer1}>
                {profileData.map((item) => {
                  return (
                    <View style={{ alignItems: 'center', flex: 2 }}>
                      {item.Gender == 'Male' ? <View style={{ paddingBottom: 20 }} >
                        <Image
                          style={styles.tinyLogo}
                          source={require('../assets/download.jpeg')}
                          alt='Male'
                        />
                      </View> :
                        <View style={{ flex: 2, paddingBottom: 30 }} >
                          <Image
                            style={styles.tinyLogo}
                            source={require('../assets/OIP.jpg')}
                            alt='FeMale'
                          />
                        </View>}
                      <View style={{ flex: 2 }} >
                        <Text style={styles.item}>{item.Email}</Text>
                        <Text style={[styles.item, { fontSize: 12, fontStyle: 'italic', textDecorationLine: 'underline', textAlign: 'center' }]}>{item.First_Name} {item.Last_Name}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flex: 2 }}>
                        <View style={{ paddingRight: 15 }}>
                          <Text style={{ textAlign: 'center', fontSize: 16,fontWeight: 'bold' }}>{item.followers}</Text>
                          <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                        </View>
                        <View style={{ paddingLeft: 15 }}>
                          <Text style={{ textAlign: 'center', fontSize: 16,fontWeight: 'bold' }}>{item.following}</Text>
                          <Text style={{ fontWeight: 'bold' }}>Following</Text>
                        </View>
                      </View>
                      {editButton ?
                        <View style={{ flex: 2, alignItems: 'center' }} >
                          <TouchableOpacity onPress={() => { setEditProfle(true); setEditButton(false) }} style={styles.button}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Profile</Text>
                          </TouchableOpacity>
                        </View> : ''}
                      {editProfile ? <View style={{ flex: 3 }} >
                        <View style={{ flexDirection: 'row' }}>
                          <View>
                            <TextInput
                              style={styles.widthinput}
                              onChangeText={newText => setImgWidth(newText)}
                              placeholder={item.First_Name}
                              keyboardType="default"
                              value={imgWidth}
                            />
                          </View>
                          <View>
                            <TextInput
                              style={styles.widthinput}
                              onChangeText={newText => setImgHeight(newText)}
                              placeholder={item.Last_Name}
                              value={imgHeight}
                            />
                          </View>
                        </View>
                        <View>
                          <TextInput
                            placeholder={item.User_Name}
                            onChangeText={newText => setTextPrompt(newText)}
                            style={styles.TextArea}
                            required="true"
                            value={textPrompt}
                          />
                        </View>
                        <View style={{ flex: 2, alignItems: 'center' }} >
                            <TouchableOpacity onPress={() => editUserProfile()} style={styles.button2}>
                              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit</Text>
                            </TouchableOpacity>
                          </View>
                      </View> : ''}
                    </View>
                  );
                })}</View> : <View style={{ top: 250 }}><ActivityIndicator color="#22E5FE" size="large" /></View>}


            </View>
          </Modal>

          <TouchableOpacity onPress={() => setModalVisible1(true)}
            style={{ flexDirection: 'row', top: 50, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#ccc' }}>
            <Feather name="unlock" size={36} color="black" style={{ left: 30 }} />
            <Text style={{ fontSize: 18, left: 40, top: 7 }}>Update Password</Text>
            <AntDesign name="right" size={30} color="black" style={{ left: 102, top: 7 }} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
            }}>
            <View style={styles.modalView}>
              <Pressable style={{ left: 130, bottom: 5 }} onPress={() => setModalVisible1(!modalVisible1)}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
              <View style={{ width: '100%', top: 30 }}>
                <TextInput
                  placeholder="Current Password"
                  onChangeText={newText => setCurPass(newText)}
                  style={styles.TextArea1}
                />
                <TextInput
                  placeholder="New Password"
                  onChangeText={newText => setNewPass(newText)}
                  style={styles.TextArea1}
                  onBlur={() => validatePass(newPass)}
                  value={newPass}
                />
                {validatepassword ? <Text style={{ color: 'red', left: 15, top: 10 }}>Password must be 8 characyer long ,at least one {"\n"} letter, one number and one special character</Text> : ''}
                <TextInput
                  placeholder="Confirm Password"
                  onChangeText={newText => setconfPass(newText)}
                  style={styles.TextArea1}
                  secureTextEntry={true}
                />
                {checkpass ? <Text style={{ top: 20, left: 20, fontSize: 15, color: 'red' }} >Password is Not Matched</Text> : ''}
                {isLoading ? <View style={{ top: 20 }}><ActivityIndicator color="#22E5FE" size="large" /></View> : ''}
                <Text style={{ top: 30, left: 60, fontSize: 15, color: 'green' }}>{msg}</Text>
                <View style={{ flex: 2, alignItems: 'center' }} >
                  <TouchableOpacity onPress={() => updatePass()} style={[styles.button1, { top: 80, flexDirection: 'row' }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Update Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>
          <TouchableOpacity onPress={() => setModalVisible2(true)}
            style={{ flexDirection: 'row', top: 75, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#ccc' }}>
            <AntDesign name="exclamationcircleo" size={34} color="black" style={{ left: 30 }} />
            <Text style={{ fontSize: 18, left: 40, top: 7 }}>About</Text>
            <AntDesign name="right" size={30} color="black" style={{ left: 200, top: 7 }} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}>
            <View style={styles.modalView}>
              <Pressable style={{ left: 130, bottom: 5 }} onPress={() => setModalVisible2(!modalVisible2)}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
              <ScrollView
                style={{ padding: 20 }}>
                <View style={{ alignItems: 'center' }} >
                  <Text style={{ color: '#22E5FE', fontSize: 20, textDecorationLine: 'underline' }}>About <Text style={{ color: '#C859EE' }}>EvasionAi</Text></Text>

                </View >
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16 }}>The EvasionAi app is a creative tool that converts text input into a custom image. Users can enter text, specify image height and width, Image generation steps, Image generation guidence scale to generate an image.</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 30 }}>
                  <Text style={{ color: '#C859EE', fontSize: 20, fontSize: 20, textDecorationLine: 'underline' }}>Key Features</Text>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16, paddingTop: 5 }}><Text style={{ color: '#C859EE' }}>1:-</Text> Text input: Enter text to convert into an image.</Text>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16, paddingTop: 5 }}><Text style={{ color: '#C859EE' }}>2:-</Text> Image dimensions: The height and width parameters control the height and width (in pixels) of the generated image. By default, the Stable Diffusion v1.5 model outputs 512x512 images, but you can change this to any size that is a multiple of 8.</Text>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16, paddingTop: 5 }}><Text style={{ color: '#C859EE' }}>3:-</Text> Guidence Scale: The guidance_scale parameter affects how much the prompt influences image generation. A lower value gives the model “creativity” to generate images that are more loosely related to the prompt. Higher guidance_scale values push the model to follow the prompt more closely, and if this value is too high, you may observe some artifacts in the generated image.</Text>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16, paddingTop: 5 }}><Text style={{ color: '#C859EE' }}>4:-</Text> Negative prompt: Just like how a prompt guides generation, a negative prompt steers the model away from things you don’t want the model to generate. This is commonly used to improve overall image quality by removing poor or bad image features such as “low resolution” or “bad details”. You can also use a negative prompt to remove or modify the content and style of an image.</Text>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16, paddingTop: 5 }}>In EvasionAi: The defalut Negitive Prompt is: "ugly, deformed, disfigured, poor details, bad anatomy"</Text>
                  <Text style={{ textAlign: 'center', color: '#C859EE', fontSize: 16, paddingTop: 10 }}>This Text to Image app so, called EvasionAi is developed as FYP by</Text>
                  <Text style={{ textAlign: 'center', color: '#22E5FE', fontSize: 16, paddingTop: 5 }}>Mohammad <Text style={{ color: '#C859EE' }}>Azeem</Text></Text>
                  <Text style={{ textAlign: 'center', color: '#C859EE', fontSize: 16 }}>&</Text>
                  <Text style={{ textAlign: 'center', color: '#C859EE', fontSize: 16, paddingTop: 5, paddingBottom: 10 }}>Anas <Text style={{ color: '#22E5FE' }}>Anayat</Text></Text>
                  <Text style={{ textAlign: 'right', color: '#C859EE', fontSize: 12, paddingTop: 0, paddingBottom: 40 }}><Text style={{ color: '#22E5FE' }}>BS</Text> Infromation Security</Text>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
      <View style={{ flex: 2, alignItems: 'center' }} >
        <TouchableOpacity onPress={() => Logout()} style={[styles.button, { top: 130, flexDirection: 'row' }]}>
          <EvilIcons name="arrow-left" size={38} color="red" /><Text style={{ fontSize: 16, fontWeight: 'bold' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ImgContainer1: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 60
  },
  button: {
    width: 150,
    height: 45,
    backgroundColor: '#BFE6FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#22E5FD',
    borderWidth: 2,
    borderRadius: 10
  },
  button1: {
    width: 180,
    height: 45,
    backgroundColor: '#BFE6FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#22E5FD',
    borderWidth: 2,
    borderRadius: 10
  },
  TextArea1: {
    width: '90%',
    top: 20,
    margin: 12,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#C859EE',
    padding: 10,
  },
  modalView: {
    width: 350,
    height: 600,
    left: 5,
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
    top: 10,
    borderRadius: 48,
    height: 100,
    width: 100
  },
  item: {
    top: 18,
  },
  buttonS: {
    top: 28,
    width: 100,
    height: 30,
    backgroundColor: '#BFE6FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#22E5FD',
    borderWidth: 2
  },
  widthinput: {
    height: 40,
    margin: 12,
    width: 155,
    borderWidth: 2,
    borderColor: '#C859EE',
    borderRadius: 10,
    padding: 10,
  },
  TextArea: {
    margin: 12,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#C859EE',
    padding: 10,
  },
  button2: {
    width: 80,
    height: 45,
    backgroundColor: '#BFE6FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#22E5FD',
    borderWidth: 2,
    borderRadius: 10
  },
});

export default Setting

