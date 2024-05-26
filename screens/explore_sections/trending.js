import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, ToastAndroid, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


import { AntDesign } from '@expo/vector-icons';
import SyncStorage from 'sync-storage';


const Trending = () => {

    const [records, setRecords] = useState('');
    const isFocused = useIsFocused();
    const [isLoadiing, setIsLoading] = useState(false);

    
    const showConfirmDialog = (val) => {
        return Alert.alert(
            "Are your sure?",
            "You want to Unfollow " + val.User_Name,
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        Check(val);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };

    Users = async () => {
        
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/trending', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });;
            const data = await response.json();
            setRecords(data)
            setIsLoading(false)
            if (data.length === 0) {
            } else {
            }
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    }
    Check = async (val) => {
        const result = SyncStorage.get('Email');
        val["Follower_Email"] = result
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/trending', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(val)
            });
            const data = await response.json();
            setIsLoading(false)
            if (data.success) {
                if (val.Follow === 0) {
                    ToastAndroid.show('You Successfully Follow  ' + val.User_Name + ' !', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('You Unfollow ' + val.User_Name + ' !', ToastAndroid.SHORT);
                }
                Users()
            } else {

            }
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };
    

    React.useEffect(() => {
        if (isFocused) {
            Users()
        }
    }, [isFocused])

    

    return (
        <View style={{ flex: 8, backgroundColor: '#ffff' }}>
            
            {records ? <ScrollView style={styles.ImgContainer1}>
                {records.map((item) => {
                    return (
                        <View
                            style={[
                                styles.container,

                                {
                                    // Try setting `flexDirection` to `"row"`.
                                    flexDirection: 'column',
                                },
                            ]}>
                            {item.Gender == 'Male' ? <View style={{}} >
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../../assets/download.jpeg')}
                                    alt='Male'
                                />
                            </View> :
                                <View style={{ flex: 2, paddingBottom: 30 }} >
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('../../assets/OIP.jpg')}
                                        alt='FeMale'
                                    />
                                </View>}
                              
                            <View style={{ flex: 2 }} >
                                <Text style={[styles.item,{fontWeight:'bold',fontSize:18}]}>Email</Text>
                                <Text style={styles.item}>{item.Email}</Text>
                            </View>
                            <View style={{ flex: 3 }} >
                            <Text style={[styles.item,{fontWeight:'bold',fontSize:18}]}>Text Prompt</Text>
                            <Text style={styles.item}>{item.TextPrompt}</Text>
                            </View>
                        </View>
                    );
                })}</ScrollView> : <View style={{ top: 250 }}><ActivityIndicator color="#22E5FE" size="large" /></View>}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:350,
      height:250,
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
    ImgContainer1: {
        paddingTop: 20,
        paddingBottom: 60
    },
    tinyLogo: {
        borderRadius: 25,
        height: 50,
        width: 50
    },
    item: {
        top: 18,
        textAlign:'center'
        
    },
    button: {
        top: 28,
        width: 100,
        height: 30,
        backgroundColor: '#BFE6FB',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#22E5FD',
        borderWidth: 2
    },
    
})
export default Trending