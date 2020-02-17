import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from "react-native"
// import { TextInput } from 'react-native-gesture-handler'
import { Button, Card, Title } from "react-native-paper"
import KeyboardSpacer from 'react-native-keyboard-spacer'
import io from "socket.io-client"

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: "",
      users : null
    }
  }

  componentDidMount(){
    this.socket = io("http://3c2851ed.ngrok.io")

  //   this.socket.on("get-users", data => {
  //     // data.map(item=>{
  //     //     console.log(item);
  //     //     // this.state.users.push(item)
  //     //     this.setState({
  //     //         users : [...item]
  //     //     })
  //     // })
  //     this.setState({
  //         users: data
  //     })
  //     console.log("Online Users");
  //     console.log(this.state.users);


  // })


  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        
        
          {/* <Text>Home Screen</Text> */}
          {/* <Text>{this.state.name}</Text> */}

          <ImageBackground
            style={{ width: "100%", height: "60%" }}
            resizeMode="stretch"
            source={require("../assets/mycurve.png")}>
            <ScrollView >
            <TextInput
              style={style.textInput}
              mode="outlined"
              label="Enter Your name"
              placeholder="Enter Name"
              value={this.state.name}
              onChangeText={(name) => {
                this.setState({ name: name })
              }}
            />
            <View >
              <Button
                style={style.buttonInput}
                mode="contained"
                title="Go to Chat"
                onPress={() => {
                  this.socket.emit("new-user",this.state.name)
                  this.props.navigation.navigate('Chat', { name: this.state.name })
                }
                }
              >
                Go to Chat
          </Button>
            </View>
            </ScrollView>
          </ImageBackground>

          <View style={{ flex: 1, flexDirection: "row", marginTop: "-20%", justifyContent: "space-around" }}>
            <View >
              <Card style={style.myCart}>

                <Card.Content>
                  <Title>React NAtive</Title>
                </Card.Content>

              </Card>
              <Card style={style.myCart}>

                <Card.Content>
                  <Title>React NAtive</Title>
                </Card.Content>

              </Card>
              <Card style={style.myCart}>

                <Card.Content>
                  <Title>React NAtive</Title>
                </Card.Content>

              </Card>
            </View>
            <View>
              <Card style={style.myCart}>

                <Card.Content>
                  <Title>React NAtive</Title>
                </Card.Content>

              </Card>
              <Card style={style.myCart}>

                <Card.Content>
                  <Title>React NAtive</Title>
                </Card.Content>

              </Card>
              <Card style={style.myCart}>

                <Card.Content>
                  <Title>React NAtive</Title>
                </Card.Content>

              </Card>
            </View>
          </View>
          
         
      </View>
        )
      }
    }
    
const style = StyleSheet.create({
          textInput: {
          borderRadius: 30,
        margin: 40,
        backgroundColor: "white",
        height: 50
      },
  buttonInput: {
          backgroundColor: "pink",
        borderRadius: 50,
        marginTop: -10,
        marginLeft : 100,
        marginRight : 100
      },
  myCart : {
          marginBottom : 10,
        elevation : 5
      }
})