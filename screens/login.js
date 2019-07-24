import * as React from 'react';
import {

  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import { Input, Header } from 'react-native-elements';

import DropDownItem from 'react-native-drop-down-item';
import firebase from 'firebase';
// Global Variables 
const DOWN = require('../assets/Down.png');
const UP = require('../assets/Up.png');

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
goToHome = () => {
    this.props.navigation.navigate('Guides', {
      username:this.state.username, password:this.state.password
      });

  }
  goToRegister = () => {
    this.props.navigation.navigate('Register');
  }
  goTocompany = () =>{
     this.props.navigation.navigate('SignInC');
  }
  state = {
    username: null,
    password: null,
    message: "",
    contents: [
      {
        title: 'ABOUT US:',
        body: 'We come from Code For Palestine, and in this app you will find a phenomenal guide to Palestenian tourism! And not only that but it has amazing benefits locally',
      },
    ],
  }
  LoggedIn = () =>{
    const users = firebase.database().ref('users').on('value', snapshot => {
    const users = snapshot.val();
    var check = false;
    for(var key in users){
      console.log(users.length + " is ")
      var username = users[key].username;
      var password = users[key].password;
      if(username == this.state.username && password == this.state.password){
        check = true;
        break;
      }

    }
    if(check){
      this.props.navigation.navigate('Home', {username:this.state.username});
    }
    else{
      this.setState({ message:
        "username and password doesn't match"
      });
    }
    this.forceUpdate();
    })
  }

  render() {
    return (

      <View style={styles.container}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
      

        <Card style={{marginLeft:20, marginRight:20}}>
                <Image style={styles.img} source ={require('../assets/logo.png')}
        />
        <View style={{marginTop:70}}>

        {this.state.contents
            ? this.state.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    invisibleImage={DOWN}
                    visibleImage={UP}
                    header={
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontWeight:'bold',
                            textAlign:'center'
                          }}>
                          {param.title}
                        </Text>
                      </View>
                    }>
                    <Text
                      style={[
                        styles.txt,
                        {
                          fontSize: 18,
                        },
                      ]}>
                      {param.body}
                    </Text>
                  </DropDownItem>
                );
              })
            : null}
          <View style={{ height: 110 }} />

          <View style={styles.SectionStyle}>
          <Image
            source={require('../assets/male.png')}
            style={styles.ImageStyle}
          />        
        <TextInput
            style={{ flex: 1 }}
            placeholder="username"
            onChangeText = {(text) => this.setState({username: text})}
          />
          </View>

        <View style={styles.SectionStyle}>
          <Image
            source={require('../assets/password.png')}
            style={styles.ImageStyle}
          />
         <TextInput
            style={{ flex: 1 }} 
             secureTextEntry={true}
            placeholder="password"
            onChangeText = {(text) => this.setState({password: text})}
          />
        </View>
      
        </View>

        <TouchableOpacity onPress={this.LoggedIn}>
          <Text style={{fontSize:16, paddingTop:90, paddingBottom:13, textAlign:'center'}}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToRegister}>
        <Text style={{fontSize:16, textAlign:'center', marginBottom:101}}> Don't have an account? </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {this.goTocompany}>
        <Text style = {{color: 'blue', textAlign:'center'}}>
            Sign in as a company
        </Text>
      </TouchableOpacity>

      <Text style ={{color: 'red', textAlign: 'center'}}> {this.state.message}</Text>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#083b66',
  },
  img: {
    width: 130,
    height: 120,
    alignSelf: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
 
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});