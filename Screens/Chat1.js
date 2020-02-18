import React, { Component } from 'react'
import { View, Text } from "react-native"
import io from "socket.io-client"

export default class Chat_rd extends Component {

    constructor(props){
        super(props)

        this.state = {
            usersName : props.navigation.getParam("name"),
            users : []
        }
    }

    componentDidMount(){
        this.socket = io("http://b0795b5e.ngrok.io")

        this.socket.emit("new-user", this.state.usersName)

        this.socket.on("get-users", (data)=>{
            this.setState({
                users : data
            },() => {
                console.log("After state change", this.state.users);

            })
            console.log("State Users",this.state.users);
            
        })
    }


    render() {
        // const { navigation } = this.props;
        // let name = navigation.getParam("name")
        
        
        return (
            <View>
                <Text>Chat</Text>
                <Text>WelCome {this.state.usersName}</Text>
                {
                    this.state.users.map((item,i)=>
                    <Text key={i}>{item}</Text>
                    )
                }
            </View>
        )
    }
}
