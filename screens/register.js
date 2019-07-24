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
import { Input } from 'react-native-elements';

import firebase from 'firebase';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    message: '',
  };
  Back = () => {
    this.props.navigation.navigate('Login');
  };
  publish = () => {
    firebase
      .database()
      .ref('users')
      .on('value', snapshot => {
        const users = snapshot.val();
        var Usernames = [];
        for (var key in users) {
          Usernames.push(users[key].username);
        }
        for (var i = 0; i < Usernames.length; i++) {
          var current = Usernames[i];
          if (current == this.state.username) {
            this.setState({
              message: 'username already exists',
            });
            this.forceUpdate();
            return;
          }
        }
        const usersAdd = firebase.database().ref('users');
        usersAdd.push({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });
        this.props.navigation.navigate('Home', {
          username: this.state.username,
        });
      });
  };

  render() {
    return (
        <View style={styles.container}>
          <ScrollView>

            <Card style={{ marginLeft: 20, marginRight: 20 }}>
            <Image style={styles.img} source ={require('../assets/logo.png')}
        />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 50,
                  marginTop: 70,
                }}>
                {' '}
                Register here!{' '}
              </Text>
              <TextInput placeholder="Name" style={styles.inputs} />
              <TextInput
                placeholder="Username"
                style={styles.inputs}
                onChangeText={text => this.setState({ username: text })}
              />
              <TextInput
                placeholder="Email"
                style={styles.inputs}
                onChangeText={text => this.setState({ email: text })}
              />
              <TextInput
                placeholder="Password"
                style={styles.inputs}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
              <TextInput placeholder="Confirm Password" style={styles.inputs} />

              <TouchableOpacity onPress={this.publish} style = {{alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    marginBottom: 13,
                    marginTop: 70,
                    borderWidth: 0.7,
                    width: 150,
                    borderRadius: 15
                  }}>
                  {' '}
                  Submit{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.Back} style = {{alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    marginBottom: 58,
                    borderWidth: 0.7,
                    borderRadius: 15,
                    width: 220
                  }}>
                  {' '}
                  Back to login page{' '}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: 'red', textAlign: 'center' }}>
                {' '}
                {this.state.message}
              </Text>
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
    backgroundColor: '#083b66',
  },
  img: {
    width: 130,
    height: 120,
    alignSelf: 'center',
  },
  inputs:{
    borderWidth: 0.7,
    borderColor: 'blue',
    margin: 10,
  }

});
