import React, { Component } from 'react'
import { Button, TextInput } from 'react-native-paper';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    AsyncStorage,
    ActivityIndicator

} from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions, NavigationAction } from "react-navigation"

export default class LoginScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            inicator: false
        }
    }

    // async componentWillMount(){
    //     let token = await AsyncStorage.getItem("token")
    //     if(token){
    //         this.props.navigation.navigate('LandingPage')
    //     }
    // }

    signin = () => {
        this.setState({
            inicator: true
        })
        fetch("http://7ffe8f4a.ngrok.io/signin", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            })
        })
            .then(res => res.json())
            .then(res2 => {
                // console.log(res2.message);
                // alert(res2.message)
                if (res2.err === false) {
                    alert(res2.message)
                    this.props.navigation.navigate('App')
                    // const resetAction = StackActions.reset({
                    //     index: 0,
                    //     actions: [NavigationActions.navigate({ routeName: 'LandingPage' })],
                    //   });
                    //   this.props.navigation.dispatch(resetAction);

                } else {
                    alert(res2.message)
                    this.props.navigation.navigate('Auth')
                }

            })
            .catch(err => {
                console.log("From Catch", err.message);

            })
    }

    render() {
        return (
            <>
                <KeyboardAvoidingView behavior="position">
                    <ScrollView>
                        <StatusBar backgroundColor="blue" barStyle="light-content" />
                        <Text
                            style={{ fontSize: 35, marginLeft: 18, marginTop: 10, color: "#3b3b3b" }}>welcome to</Text>

                        <View
                            style={{
                                borderBottomColor: "blue",
                                borderBottomWidth: 4,
                                borderRadius: 10,
                                marginLeft: 20,
                                marginRight: 150,
                                marginTop: 4
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20, marginLeft: 18, marginTop: 20
                            }}

                        >Login with email</Text>
                        <TextInput
                            label='Email'
                            mode="outlined"
                            value={this.state.email}
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            theme={{ colors: { primary: "blue" } }}
                            onChangeText={(email) => {
                                this.setState({
                                    email: email
                                })
                            }}

                        />
                        <TextInput
                            label='password'
                            mode="outlined"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => {
                                this.setState({
                                    password: password
                                })
                            }}

                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            theme={{ colors: { primary: "blue" } }}

                        />
                        <Button
                            mode="contained"
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            onPress={this.signin}>
                            Login
                    </Button>
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.inicator} />
                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 18, marginLeft: 18, marginTop: 20
                                }}
                                onPress={() => this.props.navigation.navigate('Signup')}
                            >dont have a account ?</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
        )
    }
}
