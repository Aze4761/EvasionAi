import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react'
import {Alert} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Registration = ({ navigation }) => {
    const [phoneNo, setPhoneNo] = useState()
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [textPrompt, setTextPrompt] = useState('');
    const [imgWidth, setImgWidth] = useState('');
    const [imgHeight, setImgHeight] = useState('');
    const [password, setPassword] = useState('');
    const [validateEmail, setValidateEmail] = useState('')
    const [validatepassword, setValidatePassword] = useState('')
    const [formIsValid, setFormIsValid] = useState('')
    const [confirm,setConfirm]=useState(false)
    const [exist,setExist]= useState(false)
    const [isLoadiing,setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const label_data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },

    ];
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <MaskedView style={{ right: 15, bottom: 10 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 16, fontWeight: 'bold', paddingLeft: 20 }}>Gender</Text>}>
                    <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#22E5FE', '#C859EE']}
                    >
                        <Text style={{ fontSize: 16, opacity: 0, paddingLeft: 20 }}>Gender</Text>
                    </LinearGradient>
                </MaskedView>
            );
        }
        return null;
    };
    validatePass = (val) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        const isValid = re.test(val)
        if (!isValid) {
            setValidatePassword('Password may be * characyer long ,at least one letter, one number and one special character')
        } else {
            setValidatePassword('')
        }
    }
    validate = (val) => {
        
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = re.test(val)
        if (!isValid) {
            setValidateEmail('Please Enter a Valid Email')
        } else {
            setValidateEmail('')
        }
    }
   
    Register = async () => {
        console.log('refsf')
        if (!validateEmail && !validatepassword) {
            console.log('Form is Submitted')
            setFormIsValid('')
            setIsLoading(true)
            try {
                const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'/registration', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        First_Name: imgWidth,
                        Last_Name: imgHeight,
                        User_Name: textPrompt,
                        Email: email,
                        Password: password,
                        Phone_No: phoneNo,
                        Gender: value
                    }),
                });;
                const data = await response.json();
                setIsLoading(false)
                console.log(data.status)
                if (data.success) {
                    setExist(false)
                    setConfirm(true)
                    setValue('Gender')
                    setPhoneNo()
                    setEmail('')
                    setTextPrompt('')
                    setPassword('')
                    setImgWidth('')
                    setImgHeight('')
                } else {
                    setExist(true)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error);
                setError(true)
            }
        } else {
            setFormIsValid('Please fill the Registerartion Form Correctly')
            console.log('Form is Not Submitted')
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
            <View style={{paddingBottom:20}}>
                <View style={{ flex: 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <MaskedView style={{ top: 60, }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 24, fontWeight: 'bold' }}>Registerf</Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 24, opacity: 0 }}>Registerf</Text>
                        </LinearGradient>
                    </MaskedView>
                </View>
                <View style={{ flex: 3, paddingTop: 60, top: 20 }} >
                    <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 12, fontWeight: 'bold', paddingLeft: 20 }}>Craft Your Vision, Word by Word: Register for Limitless Text-to-Image Creativity</Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 12, opacity: 0, paddingLeft: 20 }}>Craft Your Vision, Word by Word: Register for Limitless Text-to-Image Creativity</Text>
                        </LinearGradient>
                    </MaskedView>
                    {confirm ?<View style={{backgroundColor:'#BFEA7C',paddingTop:10,paddingBottom:10,top:10,borderColor:'#9BCF53',borderWidth:1, width:350,marginLeft:5,borderRadius:25}}><Text style={{ left:35,fontWeight:'bold'}}><FontAwesome5 name="check-circle" size={20} color="green"/>  Successfully Registered</Text></View> : ''}
                    {exist ?<View style={{backgroundColor:'#ffebe8',paddingTop:10,paddingBottom:10,top:10,borderColor:'red',borderWidth:1, width:350,marginLeft:5,borderRadius:25}}><Text style={{ left:15,fontWeight:'bold'}}><FontAwesome name="user" size={20} color="red" />  User is Already Registered with this Email</Text></View> : ''}
                </View>
                <View style={{ flex: 3, paddingTop: 30 }} >
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <TextInput
                                style={styles.widthinput}
                                onChangeText={newText => setImgWidth(newText)}
                                placeholder="First Name"
                                keyboardType="default"
                                value={imgWidth}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.widthinput}
                                onChangeText={newText => setImgHeight(newText)}
                                placeholder="Last Name"
                                value={imgHeight}
                            />
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder="UserName"
                            onChangeText={newText => setTextPrompt(newText)}
                            style={styles.TextArea}
                            required="true"
                            value={textPrompt}
                        />
                        <TextInput
                            placeholder="Email"
                            onChangeText={newText => setEmail(newText)}
                            style={styles.TextArea}
                            onBlur={() => validate(email)}
                            required="true"
                            type="email"
                            value={email}
                        />
                        {validateEmail ? <Text style={{ color: 'red', left: 15 }}>Please Enter Valid Email</Text> : ''}
                        <TextInput
                            placeholder="Password"
                            onChangeText={newText => setPassword(newText)}
                            style={styles.TextArea}
                            onBlur={() => validatePass(password)}
                            required="true"
                            value={password}
                        />
                        {validatepassword ? <Text style={{ color: 'red', left: 15 }}>Password must be 8 characyer long ,at least one letter, one number and one special character</Text> : ''}
                        <TextInput
                            placeholder="PhoneNo."
                            onChangeText={newText => setPhoneNo(newText)}
                            style={styles.TextArea}
                            keyboardType="numeric"
                            required="true"
                            maxLength={11}
                            value={phoneNo}
                        />
                    </View>
                </View>
                <View style={{ flex: 2, paddingTop: 20, paddingLeft: 15 }} >
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
                        placeholder={!isFocus ? 'Gender' : '...'}
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
                                color={isFocus ? '#C859EE' : 'grey'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                    {formIsValid ? <Text style={{ color: 'red', left: 18 }}>Plaese Fill the Registration Form Correctly</Text> : ''}
                </View>
                <View style={{ flex: 2, paddingBottom: 20,paddingTop: 40, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity style={styles.button} onPress={() => Register()}>
                    {isLoadiing ? <View><ActivityIndicator color="#22E5FE"  size="large"/></View>:
                        <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 16, fontWeight: 'bold', paddingLeft: 20 }}>Register</Text>}>
                            <LinearGradient
                                start={{ x: 1, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                colors={['#22E5FE', '#C859EE']}
                            >
                                <Text style={{ fontSize: 16, opacity: 0, paddingLeft: 20 }}>Register</Text>
                            </LinearGradient>
                        </MaskedView>}
                    </TouchableOpacity>
                </View>
                {/*<View>
                    <MaskedView style={{ bottom: 10 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 12, fontWeight: 'bold', paddingLeft: 20 }}>If 'You Are Already Registered  :- <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ top: 10 }}><Text style={{ color: '#22E5FE', fontWeight: 'bold' }}>Login Here</Text></TouchableOpacity></Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 12, opacity: 0, paddingLeft: 20 }}>If 'You Are Already Registered  :- <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ top: 10 }}><Text style={{ color: '#22E5FE', fontWeight: 'bold' }}>Login Here</Text></TouchableOpacity></Text>
                        </LinearGradient>
                    </MaskedView>
                </View>*/}
                <View style={{paddingTop: 20 }}>
                    <MaskedView style={{ bottom: 10 }} maskElement={<Text style={{ backgroundColor: 'transparent', fontSize: 12, fontWeight: 'bold', left: 100 }}>If 'You Are Already Registered  :- </Text>}>
                        <LinearGradient
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['#22E5FE', '#C859EE']}
                        >
                            <Text style={{ fontSize: 12, opacity: 0, left:100 }}>If 'You Are Already Registered  :- </Text>
                        </LinearGradient>
                    </MaskedView>
                </View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} ><Text style={{ color: '#22E5FE', fontWeight: 'bold',textDecorationLine:'underline' }}>Login Here</Text></TouchableOpacity>
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
        width: 155,
        borderWidth: 2,
        borderColor: '#C859EE',
        borderRadius: 10,
        padding: 10,
    },
    dropdown: {
        width: 330,
        height: 50,
        borderColor: '#C859EE',
        borderWidth: 2,
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
        color: 'gray',
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    button: {
        backgroundColor: '#BFE6FB',
        padding: 10,
        height: 50,
        width: 120,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#22E5FE'
    },

});
export default Registration