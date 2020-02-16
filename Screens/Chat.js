import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native"
import io from "socket.io-client"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import KeyboardSpacer from "react-native-keyboard-spacer"
import Messages from './Messages'

export default class Chat extends Component {

    typingTimer = null;

    constructor(props) {
        super(props)

        this.state = {
            chat: "",
            chatMsgs: [],
            typing: "",
            name: this.props.navigation.getParam("name"),
            lastPress: 0
        }
    }

    componentDidMount() {
        this.socket = io("http://cc12be03.ngrok.io")

        this.socket.on("chatmessages", msg => {
            console.log("Resive msg ", msg);

            this.setState({
                chatMsgs: [...this.state.chatMsgs, msg.chat],
                name: msg.name
            })
            console.log(this.state.chatMsgs);
            this.state.chatMsgs.map(item => {
                console.log(item);

            })
            // var name = msg.name
        })

        this.socket.on("typingdata", data => {
            this.setState({
                typing: data
            })
        })

        this.socket.on("finished", () => {
            this.setState({
                typing: ""
            })
        })

        this.socket.on("typingStop",()=>{
            this.setState({
                typing: ""
            })
        })

    }

    componentWillUnmount() {
        clearTimeout(this.typingTimer);
    }

    sentMessage = () => {
        console.log("click");

        const time = new Date().getTime()

        if (time < 400) {
            console.log("Double tap");

        }

        const data = {
            name: this.props.navigation.getParam("name"),
            chat: this.state.chat
        }

        // this.socket.emit("msg", data)
        this.socket.emit(this.props.navigation.getParam("name"), data)

        console.log(this.state.chat);

        this.setState({
            chat: ""
        })

        this.socket.emit("typingOver")
    }

    doubleTap = () => {

        let delta = new Date().getTime() - this.state.lastPress;
        if (delta < 200) {
            console.log("Dolble tap");
            // double click happend
            //   this.props.onClick()
        }
        this.setState({
            lastPress: new Date().getTime()
        })
    }

    render() {
        const { navigation } = this.props;
        const name = navigation.getParam("name")
        const chatMsgs = this.state.chatMsgs.map(item => (
            <Text key={Math.random()}>From {name}: Message: {item}</Text>
        ))

        const messages = [
            { isOwnMessage: false, message: "Hi" },
            { isOwnMessage: true, message: "how can I help you" },
            { isOwnMessage: false, message: "Hi" }
        ]

        const bubble = messages.map((item, i) => <Messages {...item} key={i} />)
        // const spacer = Platform.OS === "ios" ? <KeyboardSpacer /> : <KeyboardSpacer />
        return (

            <View style={style.container} >

                <ScrollView>
                    <View >
                        <Text>Chat</Text>
                        <Text>Name: {name}</Text>
                        <Text>{this.state.typing}</Text>
                        <Text>{this.state.chat}</Text>


                        {/* {num} */}
                        {chatMsgs}

                    </View>
                    <View style={{ flex: 1 }}>
                        {bubble}
                    </View>
                </ScrollView>



                <View style={style.messageBoxContainer}>
                    <TextInput
                        style={style.messageBox}
                        placeholder="Chat"
                        value={this.state.chat}
                        onChangeText={(chat) => {
                            this.socket.emit("typing", "Some One Is typing")
                            this.setState({ chat: chat })

                            const val = chat;
                            clearTimeout(this.typingTimer);
                            this.typingTimer = setTimeout(() => {
                                if (val) {
                                    this.socket.emit("typing-stop")
                                    window.alert('Stopped typing !');
                                }
                            }, 5000);


                        }}
                    />

                    <TouchableOpacity>
                        <Text style={style.sendButton}
                            onPress={this.sentMessage}>Send</Text>
                    </TouchableOpacity>

                    {/* <Button

                        title="Send"
                        // color="blue"
                        onPress={this.sentMessage}
                    /> */}
                </View>

                {/* {spacer} */}
                <KeyboardSpacer />
            </View>

        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // height:100, 
        // width:100
    },
    messageBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        backgroundColor: "#eeeeee",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    messageBox: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#dddddd",
        backgroundColor: "#ffffff",
        paddingHorizontal: 5
    },
    sendButton: {
        color: "blue",
        marginLeft: 10,
        marginRight: 5,
        fontSize: 16,
        // fontWeigth : 5,
        // fontWeight : 5
    }
})
