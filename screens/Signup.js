import React, { useState } from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../configRegistration';
import Header from '../components/Header';

export default function Signup({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [addPermission, setAddPermission] = useState(false)

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
      if (password !== confirmPassword) {
          alert("Passwords don't match.")
          return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid
          const data = {
              id: uid,
              email,
              fullName,
              addPermission,
          };
          const usersRef = firebase.firestore().collection('users')
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
                navigation.navigate('Home', {
                    user:{data},
                    info:'String'
                })
            })
            .catch((error) => {
                alert(error)
            });
        })
        .catch((error) => {
            alert(error)
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="always">
                    <View style={styles.flex}>
                        <Text style={styles.title}>Signup</Text>

                        <TextInput
                            style={styles.input}
                            placeholder='Full Name'
                            placeholderTextColor="#E7E1DD"
                            onChangeText={(text) => setFullName(text)}
                            value={fullName}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor="#E7E1DD"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#E7E1DD"
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#E7E1DD"
                            secureTextEntry
                            placeholder='Confirm Password'
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onRegisterPress()}>
                            <Text style={styles.buttonTitle}>Create account</Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4ECEA'
    },
    title: {

    },
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        color: '#E7E1DD',
        fontFamily: 'space-mono',
    },
    button: {
        backgroundColor: 'transparent',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: 'white',
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#E7E1DD',
        fontFamily: 'space-mono'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: 'poppins',
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        color: '#E7E1DD',
        fontWeight: 'bold',
        fontFamily: 'poppins',
    },  
})