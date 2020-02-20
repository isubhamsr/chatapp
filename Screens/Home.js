import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from "react-native"
import { Button, Card, Title } from "react-native-paper"
import KeyboardSpacer from 'react-native-keyboard-spacer'
import axios from "axios"


export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: "",
      users: null
    }
  }

  componentDidMount() {


  }

  login = () => {
    const data = {
      "name": this.state.name
    }



    // axios.post("http://localhost:3000/api/v1/login",data)
    // .then(res=>{
    //   console.log(res);

    // })
    // .catch((err)=>{
    //   console.log(err);

    // })
    console.log("data");

    fetch("http://76df2d99.ngrok.io/api/v1/login", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": this.state.name
      })
    })
      .then(res => res.json())
      .then(res2 => {
        console.log(res2.users);
        this.props.navigation.navigate('ChatList', { users: res2.users })
      })
      .catch(err => {
        console.log(err.message);

      })

    // fetch("https://jsonplaceholder.typicode.com/users")
    // .then(res=>res.json())
    // .then(res2=>{
    //   console.log(res2);

    // })
    // .catch(err=>{
    //   console.log(err.message);

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
                onPress={this.login}
              //   {
              //   // this.socket.emit("new-user",this.state.name)
              //   // console.log("from home",this.state.name);
              //   this.login
              //   this.props.navigation.navigate('ChatList', { name: this.state.name })
              // }

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
    marginLeft: 100,
    marginRight: 100
  },
  myCart: {
    marginBottom: 10,
    elevation: 5
  }
})