import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';


import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

// You can import from local files
// or any pure javascript modules available in npm
import {Input} from 'react-native-elements';

import {Card} from 'react-native-paper'
export default class Login extends React.Component {

  goTocompany = () =>{
     this.props.navigation.navigate('Companies');
  }
  state = {
    Admin: null,
    password: null,
    message: ""
  }
  LoggedIn = () =>{
    const admin = this.state.Admin;
    const pass = this.state.password;
    if(admin == "Admin1234" && pass == "1234"){
      this.props.navigation.navigate('Companies');
    }
    else{
      this.setState({
        message: "Wrong password or adminname"
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView>
      <Card style={{ marginLeft: 20, marginRight: 20 }}>
      <Image style={styles.img} source ={require('../assets/logo.png')}
        />
        <Text style={styles.paragraph}>
          Tourists best APP!
        </Text>
      <TextInput style = {styles.inputs}
      placeholder = "  Admin"
      onChangeText = {(text) => this.setState({Admin: text})}
      />
      <TextInput style = {styles.inputs}
      placeholder = "  password"
      secureTextEntry={true}
      onChangeText = {(text) => this.setState({password: text})}
      />
      
      <TouchableOpacity style = {{textAlign: 'center', fontSize: 20}} onPress = {this.LoggedIn}>
      <Text style = {{textAlign: 'center'}}>Sign In</Text>
      </TouchableOpacity>
  
      <Text style ={{color: 'red', textAlign: 'center'}}> {this.state.message}</Text>
      </Card>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#083b66',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'top'
  },
  inputs: {
    width: 280,
    margin: 15,
    borderWidth: 0.5,
    alignSelf: 'center',
    color: 'blue',
  },
  img: {
    width: 130,
    height: 120,
    alignSelf: 'center',
  },
});
