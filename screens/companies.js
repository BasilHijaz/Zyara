import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Picker,
  TouchableOpacity,
  Image
} from 'react-native';

import firebase from 'firebase';
import { Input } from 'react-native-elements';

import {Card} from 'react-native-paper';
export default class companies extends React.Component {
  state = {
    Type: "Guide",
    name: "",
    email: "",
    description: "",
    city: "Nablus",
    x: "",
    y:"",
    message:""
  };
  
  publish = () => {
    const posts = firebase.database().ref('posts');
    posts.push({
      Type: this.state.Type,
      name: this.state.name,
      email: this.state.email,
      description: this.state.description,
      city: this.state.city,
      x: this.state.x,
      y: this.state.y
    });
    this.setState({
      message: "Added Successfully"
    })
  };

  render() {
    return (
      <View style={styles.container}>
      <Card style={{ marginLeft: 20, marginRight: 20 }}>
      <Image style={styles.img} source ={require('../assets/logo.png')}
        />
        <Text style = {{textAlign: 'center', fontSize:22, fontWeight:'bold', color:'blue', marginBottom:38}}> {this.state.message}</Text>
        <Picker
          selectedValue={this.state.Type}
          style={{ height: 50, width: 260 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ Type: itemValue })
          }>
          <Picker.Item label="Guide" value="Guide" />
          <Picker.Item label="Restaurant" value="Restaurant" />
          <Picker.Item label="Tour" value="Tour" />
        </Picker>
        <Input
          style={styles.Inputs}
          placeholder=" Name"
          onChangeText={text => this.setState({ name: text })}
        />
        <Input
          style={styles.Inputs}
          placeholder=" Contact Information"
          onChangeText={text => this.setState({ email: text })}
        />
        <Input
          style={styles.Inputs}
          placeholder=" Description"
          onChangeText={text => this.setState({ description: text })}
        />
        
        <Input
          style={styles.Inputs}
          placeholder=" Coordintae X"
          onChangeText={text => this.setState({ x: text })}
        />
        <Input
          style={styles.Inputs}
          placeholder=" Coordintae Y"
          onChangeText={text => this.setState({ y: text })}
        />
        <Picker
          selectedValue={this.state.city}
          style={{ height: 50, width: 260 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ city: itemValue })
          }>
          <Picker.Item label="Nablus" value="Nablus" />
          <Picker.Item label="Ramallah" value="Ramallah" />
          <Picker.Item label="Hebron" value="Hebron" />
          <Picker.Item label="Bethlehem" value="Bethlehem"/>
          <Picker.Item label="Jericho" value="Jericho"/>
        </Picker>
        <TouchableOpacity
          style={{
            borderWidth: 3,
            width: 150,
            marginTop: 30,
            borderColor: 'blue',
            alignSelf: 'center'
          }}
          onPress={this.publish}>
          <Text style={{ textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#083b66',
    padding: 8,
  },
  Inputs: {
    borderWidth: 0.6,
    margin: 20,
    width: 70,
    alignSelf: 'center'
  },
  img: {
    width: 130,
    height: 120,
    alignSelf: 'center',
  },
});
