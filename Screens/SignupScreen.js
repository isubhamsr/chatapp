import React, { Component } from 'react'
import { Button, TextInput } from 'react-native-paper';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions, NavigationAction, NavigationActions } from "react-navigation"

export default class SignupScreen extends Component {

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

    signup = () => {
        this.setState({
            inicator: true
        })

        fetch("http://7ffe8f4a.ngrok.io/signup", {
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
                console.log(res2.message);
                AsyncStorage.setItem("token", res2.token)
                alert(res2.message)
                this.props.navigation.navigate('App')
                // this.resetStack
            })
            .catch(err => {
                console.log("From Catch", err.message);

            })
    }


    resetStack = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                // NavigationActions.navigate({ routeName: 'Signup' }),
                NavigationActions.navigate({ routeName: 'LandingPage' })
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        // const { navigation } = this.props
        // let users = navigation.getParam("users")

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

                        >create new account</Text>
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
                            label='Password'
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
                            onPress={this.signup}>
                            signup
                    </Button>
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.inicator} />
                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 18, marginLeft: 18, marginTop: 20
                                }}
                                onPress={() => this.props.navigation.replace("Home")}
                            >already have a account ?</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
        )
    }
}
