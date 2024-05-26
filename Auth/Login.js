import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { Alert } from 'react-native'
import React, { useState } from 'react'
import SyncStorage from 'sync-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState(false)
    const [isLoadiing, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    logIn = async () => {
        console.log('refsf')
        console.log('Form is Submitted')
        setIsLoading(true)
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                }),
            });;
            const data = await response.json();
            setIsLoading(false)
            if (data.length === 0) {
                setCredentials(true)
            } else {
                SyncStorage.set('Email', email);
                setCredentials(false)
                navigation.navigate('Home')
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            setIsLoading(false)
            setError(true)
            console.log(error);
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
            <View style={{ paddingTop: 140 }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <MaskedView style={{ top: 60, }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 28, fontWeight: 'bold' }}>LogInf</Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 28, opacity: 0 }}>LogInf</Text>
                        </LinearGradient>
                    </MaskedView>
                    {credentials ? <View style={{ backgroundColor: '#ffebe8', paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 40, top: 70, borderColor: '#dd3c10', borderWidth: 1 }}><Text style={{ left: 35, fontWeight: 'bold' }}>Wrong Credientials</Text><Text style={{}}> Invalid Email And Password </Text></View> : ''}
                </View>
                <View style={{ flex: 3, paddingTop: 80 }} >
                    <View>
                        <TextInput
                            placeholder="Email"
                            onChangeText={newText => setEmail(newText)}
                            style={styles.TextArea1}
                        />
                        <View style={styles.container2}>
                        <TextInput
                            placeholder="Password"
                            onChangeText={newText => setPassword(newText)}
                            style={styles.TextArea}
                            secureTextEntry={!showPassword}
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                            style={styles.icon}
                            onPress={toggleShowPassword}
                        />
                        </View>
                        <View style={{ paddingBottom: 0, }} >
                            <MaskedView style={{}} maskElement={<TouchableOpacity onPress={() => navigation.navigate('Forgetpass')}><Text style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 'bold', left: 25 }}>Forget Password?</Text></TouchableOpacity>}>
                                <LinearGradient
                                    start={{ x: 1, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    colors={['#22E5FE', '#C859EE']}
                                >
                                    <TouchableOpacity onPress={() => navigation.navigate('Forgetpass')}><Text style={{ fontSize: 14, opacity: 0, left: 25 }}>Forget Password?</Text></TouchableOpacity>
                                </LinearGradient>
                            </MaskedView>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, paddingBottom: 12, paddingTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity style={styles.button} onPress={() => logIn()}>
                        {isLoadiing ? <View><ActivityIndicator color="#22E5FE" size="large" /></View> :
                            <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 18, fontWeight: 'bold'  }}>LogIn.</Text>}>
                                <LinearGradient
                                    start={{ x: 1, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    colors={['#22E5FE', '#C859EE']}
                                >
                                    <Text style={{ fontSize: 18, opacity: 0 }}>LogIn.</Text>
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
                <View style={{ flex: 3, paddingBottom: 0, paddingTop: 25 }} >
                    <MaskedView style={{ bottom: 10 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 12, fontWeight: 'bold', left: 90 }}>If 'You Are Not Already Registered  :- </Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 12, opacity: 0, left: 90 }}>If 'You Are Not Registered  :- </Text>
                        </LinearGradient>
                    </MaskedView>
                </View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Registartion')} ><Text style={{ color: '#22E5FE', fontWeight: 'bold', textDecorationLine: 'underline' }}>Register Here</Text></TouchableOpacity>
                </View>
            </View>
            {error ? <View style={{alignItems:'center',justifyContent:'center',paddingTop:40}}>
                <Text style={{color:'red',fontSize:16,textDecorationLine:'underline'}}>Make sure internet connection stable</Text>
            </View>:''
            }
            
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#f3f3f3', 
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#C859EE',
        margin: 12,
       
    }, 
    icon: { 
        
        right:0,
        
    },
    tinyLogo: {
        width: 350,
        height: 350,

        alignSelf: 'center'
    },
    TextArea: {
        padding: 10,
        width:"90%",
        
        
    },
    TextArea1: {
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
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#BFE6FB',
        height: 55,
        width: 100,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#22E5FE'
    },

});
export default Login