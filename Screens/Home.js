import React, { Component } from 'react'
import {View, Text,Button} from "react-native"
import { TextInput } from 'react-native-gesture-handler'

export default class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      name : ""
    }
  }

    render() {
        return (
            <View>
        <Text>Home Screen</Text>
    <Text>{this.state.name}</Text>
        <TextInput 
          placeholder="Enter Name"
          value = {this.state.name}
          onChangeText={(chat)=>{
            this.setState({name:chat})
          }}
        />
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat', {name:this.state.name})}
        />
      </View>
        )
    }
}
