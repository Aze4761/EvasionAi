import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const Forgetpass = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [credentials, setCredentials] = useState(false)
    const [valid,setValid] = useState(false)
    const [isLoadiing,setIsLoading] = useState(false);

    send = async () => {
        console.log('refsf')
        console.log('Form is Submitted')
        setIsLoading(true)
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'/forgetPass', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,    
                }),
            });;
            const data = await response.json();
            setIsLoading(false)
            
            if (data.success) {
                
                setCredentials(true)
                setValid(false)
            } else {
                setValid(true)
                setCredentials(false)
                
            }
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
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
            <View style={{ paddingTop: 180 }}>
                <View style={{ flex: 2,left:20}}>
                    <MaskedView style={{ top: 60, }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 28, fontWeight: 'bold' }}>Forget Password</Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 28, opacity: 0 }}>Forget Password</Text>
                        </LinearGradient>
                    </MaskedView>
                    {credentials ?<View style={{backgroundColor:'#BFEA7C',paddingTop:10,paddingBottom:10,top:70,borderColor:'#9BCF53',borderWidth:1, width:350,marginLeft:10,borderRadius:25}}><Text style={{ left:10,fontWeight:'bold'}}><FontAwesome5 name="check-circle" size={20} color="green" />  Password Is Upadted<TouchableOpacity onPress={()=>navigation.navigate('Login')} ><Text style={{fontWeight:'bold',textDecorationLine: 'underline',left:20 }}>:Login Here</Text></TouchableOpacity></Text></View> : ''}
                    {valid ?<View style={{backgroundColor:'#ffebe8',paddingTop:10,paddingBottom:10,top:70,borderColor:'red',borderWidth:1, width:350,marginLeft:10,borderRadius:25}}><Text style={{ left:15,fontWeight:'bold'}}><FontAwesome name="user" size={20} color="red" /> Account is Not exist with this Email</Text></View> : ''}
                </View>
                <View style={{ flex: 3, paddingTop: 80 }} >
                    <View>
                        <TextInput
                            placeholder="Email"
                            onChangeText={newText => setEmail(newText)}
                            style={styles.TextArea}
                        />
                        {credentials ?<View style={{backgroundColor:'#BFEA7C',paddingTop:10,paddingBottom:10,top:10,borderColor:'#9BCF53',borderWidth:1, width:350,marginLeft:30,borderRadius:25}}><Text style={{ left:5,fontWeight:'bold'}}>Check your Email: {email} for Updated Password</Text></View> : ''}
                        <View style={{ paddingTop: 20,}} >
                            <MaskedView style={{  }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', left: 25 }}>We'll send update password to this email if it matches existing account</Text>}>
                                <LinearGradient
                                    start={{ x: 1, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    colors={['#22E5FE', '#C859EE']}
                                >
                                  <TouchableOpacity onPress={''}><Text style={{ fontSize: 14, opacity: 0, left: 25 }}>We'll send update password to this email if it matches existing account</Text></TouchableOpacity>  
                                </LinearGradient>
                            </MaskedView>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, paddingBottom: 12, paddingTop: 40, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity style={styles.button} onPress={()=>send()}>
                    {isLoadiing ? <View><ActivityIndicator color="#22E5FE"  size="large"/></View>:
                        <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 18, fontWeight: 'bold',textAlign:'center',justifyContent:'center' }}>Send</Text>}>
                            <LinearGradient
                                start={{ x: 1, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                colors={['#22E5FE', '#C859EE']}
                            >
                                <Text style={{ fontSize: 18, opacity: 0, paddingLeft: 20 }}>Send</Text>
                            </LinearGradient>
                        </MaskedView>}
                    </TouchableOpacity>
                </View>
                {/*<View style={{ flex: 3, paddingBottom: 0, paddingTop: 15 }} >
                    <MaskedView style={{ bottom: 10 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 12, fontWeight: 'bold', paddingLeft: 20 }}>If 'You Are Not Already Registered  :- <TouchableOpacity onPress={() => navigation.navidgate(' Registartion')} style={{ top: 10 }}><Text style={{ color: '#22E5FE', fontWeight: 'bold' }}>Register Here</Text></TouchableOpacity></Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 12, opacity: 0, paddingLeft: 20 }}>If 'You Are Not Registered  :- <TouchableOpacity onPress={() => navigation.navigate('Registartion')} style={{ top: 10 }}><Text style={{ color: '#22E5FE', fontWeight: 'bold' }}>Register Here</Text></TouchableOpacity></Text>
                        </LinearGradient>
                    </MaskedView>
                </View>*/}
                
            </View>
        </ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        width: 350,
        height: 350,

        alignSelf: 'center'
    },
    TextArea: {
        margin: 12,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#C859EE',
        padding: 10,
    },
    widthinput: {
        height: 40,
        margin: 12,
        width: 180,
        borderWidth: 2,
        borderColor: '#C859EE',
        borderRadius: 10,
        padding: 10,
    },
    dropdown: {
        width: 380,
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
        padding: 10,
        height: 55,
        width: 120,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#22E5FE'
    },

});
export default Forgetpass