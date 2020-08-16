import React, { useState } from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../configRegistration';
import Header from '../components/Header';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
    const onLoginPress = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .get()
              .then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                      alert("User does not exist anymore.")
                      return;
                  }
                  const user = firestoreDocument.data()
                  navigation.navigate('Home', {
                      user:{user},
                      info:'String'
                  })
              })
              .catch(error => {
                  alert(error)
              });
        })
        .catch(error => {
            alert(error)
        })
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%'}}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="always">
                    <View style={styles.flex}>
                        <Text style={styles.title}>RU Clubs</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
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
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onLoginPress()}>
                            <Text style={styles.buttonTitle}>Log in</Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
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
    flex: {
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    }, 
    label: {
        color: '#ffff',
        marginLeft: 30,
        fontSize: 16,
        paddingLeft: 16

    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        color: '#E7E1DD',
        fontWeight: 'bold',
        fontFamily: 'poppins',
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
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
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
        fontFamily: 'poppins',
        fontSize: 18
    }
})