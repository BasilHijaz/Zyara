import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
  }
  state = {
    username: '',
    city1: '',
  };
  _storeData = async (key, value) => {
    try {
      AsyncStorage.setItem(key, value);
    } catch (error) {
      alert(error);
    }
  };
  signOut = () => {
    this.props.navigation.navigate('Login');
  };
  goToNablus = () => {
    this.setState({
      city1: 'Nablus',
    });
    this._storeData('city1', 'Nablus');
    this.props.navigation.navigate('Guides');
  };
  goToRamallah = () => {
    this.setState({
      city1: 'Ramallah',
    });
    this._storeData('city1', 'Ramallah');
    this.props.navigation.navigate('Guides');
  };
  goToHebron = () => {
    this.setState({
      city1: 'Hebron',
    });
    this._storeData('city1', 'Hebron');
    this.props.navigation.navigate('Guides');
  };
  goToBethlehem = () => {
    this.setState({
      city1: 'Bethlehem',
    });
    this._storeData('city1', 'Bethlehem');
    this.props.navigation.navigate('Guides');
  };
  goToJericho = () => {
    this.setState({
      city1: 'Jericho',
    });
    this._storeData('city1', 'Jericho');
    this.props.navigation.navigate('Guides');
  };
  componentDidMount = () => {
    const users = firebase
      .database()
      .ref('users')
      .on('value', snapshot => {
        const users = snapshot.val();
      });
  };

  render() {
    return (
      // <ImageBackground style={{width:'100%', height:'100%'}}
      // source={require('../assets/image.jpg')}>
      <View style={styles.container}>
        <ScrollView>
          <Card style={{ marginLeft: 20, marginRight: 20, width: 270 }}>
            <Image
              style={{
                width: 130,
                height: 130,
                borderRadius: 65,
                marginLeft: 70,
                marginTop: 10,
              }}
              source={require('../assets/logo.png')}
            />

            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              {this.params.username}
            </Text>
            <TouchableOpacity onPress={this.signOut}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#083b66',
                  fontSize: 20,
                  marginTop: 10,
                  marginBottom: 30,
                }}>
                Sign Out
              </Text>
            </TouchableOpacity>
            <Card style={{ color: 'blue' }}>
              <TouchableOpacity onPress={this.goToNablus}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginBottom: 15,
                  }}>
                  {' '}
                  Nablus
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ color: 'blue' }}>
              <TouchableOpacity onPress={this.goToRamallah}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 30,
                    marginBottom: 30,
                  }}>
                  {' '}
                  Ramallah
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ color: 'blue' }}>
              <TouchableOpacity onPress={this.goToHebron}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginBottom: 15,
                  }}>
                  {' '}
                  Hebron
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ color: 'blue' }}>
              <TouchableOpacity onPress={this.goToBethlehem}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginBottom: 15,
                  }}>
                  {' '}
                  Bethlehem
                </Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ color: 'blue' }}>
              <TouchableOpacity onPress={this.goToJericho}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginBottom: 15,
                  }}>
                  {' '}
                  Jericho
                </Text>
              </TouchableOpacity>
            </Card>
          </Card>
        </ScrollView>
      </View>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#083b66',
    padding: 8,
  },
});
