import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Linking,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

import { Header } from 'react-native-elements';

import Constants from 'expo-constants';
import { Font } from 'expo';
import { Card } from 'react-native-paper';
import firebase from 'firebase';
// You can import from local files

// or any pure javascript modules available in npm

export default class Guides extends React.Component {
  state = {
    Guides: [],
    city1: '',
    x: [],
    y: [],
    fontLoaded: true,
    showAlert: false,
    description1: '',
    pos: 0
  };
  showAlert = index => {
    let pos = index;
    this.setState({
      showAlert: true,
      pos: pos
    });
  };
  handlePress = index => {
    console.log(this.state.x);
    console.log(this.state.y);
    let x = this.state.x[index];
    let y = this.state.y[index];
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${x},${y}`;
    const label = 'Guide';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  _retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        // We have data!!
        return value;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  getUserData = async () => {
    let city1 = await this._retrieveData('city1');
    if (city1 != null) {
      this.setState({ city1: city1 });
    }
  };
  componentDidMount = async () => {
    // await Font.loadAsync({
    //   'Yasmine Rothem': require('../assets/Yasmine Rothem.tff')
    // })
    // this.setState({
    //   fontLoaded:true
    // })
    await this.getUserData();
    firebase
      .database()
      .ref('posts')
      .on('value', snapshot => {
        const posts = snapshot.val();
        var x = [];
        var y = [];
        var Guides = [];
        for (var key in posts) {
          const guide = posts[key];
          if (guide.Type == 'Guide' && guide.city == this.state.city1) {
            x.unshift(guide.x);
            y.unshift(guide.y);
            Guides.unshift(guide);
          }
        }
        this.setState({ Guides: Guides, x: x, y: y });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 60, height: 60, marginBottom: 20 }}
            />
          }
          centerComponent={{
            text: 'Guides',
            style: { color: '#58c410', fontSize: 25, fontWeight: 'bold' },
          }}
          rightComponent={{
            text: this.state.city1,
            style: { color: '#58c410', fontSize: 15 },
          }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-around',
          }}
        />
        <Text
          style={{
            fontSize: 20,
            paddingbottom: 700,
            marginTop: 20,
            marginLeft: 250,
          }}
        />
        {this.state.fontLoaded ? (
          <Text
            style={{
              fontFamily: 'king',
              fontSize: 50,
              paddingbottom: 10,
              marginTop: 10,
            }}
          />
        ) : null}
        <FlatList
          style={{ alignItems: 'center', justifyContent: 'space-between' }}
          data={this.state.Guides}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <Card
                  style={{
                    height: 200,
                    width: 150,
                    alignItems: 'center',
                    margin: 20,
                  }}>
                  <TouchableOpacity onPress={() => this.handlePress(index)}>
                    <Image
                      source={require('../assets/avatar.jpg')}
                      style={{ height: 70, width: 70, alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.showAlert(index)}>
                    <Text style={styles.txt}> Name :</Text>
                    <Text style={styles.name}> {item.name} </Text>
                    <Text style={styles.txt}> Contact information: </Text>
                    <Text style={styles.name}> {item.email} </Text>
                  </TouchableOpacity>
                  {this.state.Guides[this.state.pos].description == item.description && (
                  <AwesomeAlert
                    show={this.state.showAlert}
                    title="Description"
                    message={item.description}
                    closeOnTouchOutside={true}
                  />)}
                </Card>
              </View>
            );
          }}
        />
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
    alignItems: 'center',
    alignContent: 'center',
    fontStyle: 'Cursive',
    fontWeight: '500',
  },
  txt: {
    fontWeight: 'bold',
    Color: '#083b66',
    fontSize: 12,
    marginRight: 20,
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
  },
});
