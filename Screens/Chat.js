import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import io from "socket.io-client"
import { TextInput } from 'react-native-gesture-handler'

export default class Chat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            chat: "",
            chatMsgs: [],
            name : this.props.navigation.getParam("name")
        }
    }

    componentDidMount() {
        this.socket = io("http://6858ec3d.ngrok.io")

        this.socket.on("chatmessages", msg => {
            console.log("Resive msg ", msg);

            this.setState({
                chatMsgs: [...this.state.chatMsgs, msg.chat],
                name : msg.name
            })
            console.log(this.state.chatMsgs);
            this.state.chatMsgs.map(item => {
                console.log(item);

            })
            // var name = msg.name
        })
    }


    sentMessage = () => {
        console.log("click");

        const data = {
            name : this.props.navigation.getParam("name"),
            chat : this.state.chat
        }

        this.socket.emit("msg", data)

        console.log(this.state.chat);

        this.setState({
            chat: ""
        })
    }

    render() {
        const { navigation } = this.props;
        const name = navigation.getParam("name")
        const chatMsgs = this.state.chatMsgs.map(item => (
            <Text key={Math.random()}>From {name}: Message: {item}</Text>
        ))
        return (
            <View>
                <Text>Chat</Text>
                <Text>Name: {name}</Text>
                <Text>{this.state.chat}</Text>

                <TextInput
                    placeholder="Chat"
                    value={this.state.chat}
                    onChangeText={(chat) => {
                        this.setState({ chat: chat })
                    }}
                />

                <Button
                    title="Send"
                    onPress={this.sentMessage}
                />
                {/* {state.chatMsgs.map(item=>{
                <Text style={{paddingTop:30}}>{item}</Text>
                })}
                 */}
                {chatMsgs}
            </View>
        )
    }
}
