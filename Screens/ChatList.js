import React, { Component } from 'react'
import { View, Text, Button, ScrollView } from "react-native"
import { Card, Title } from "react-native-paper"
import ChatCardList from '../components/ChatCardList'
import io from "socket.io-client"

export default class ChatList extends Component {

    constructor(props){
        super(props)

        this.state = {
            users : []
        }
    }

    componentDidMount() {
        this.socket = io("http://e5c14135.ngrok.io")

        this.socket.on("users", data => {
            console.log("users from socket");

            // console.log(data);

            this.setState({
                users : [...data]
            })

    console.log("state data",this.state.users);
            // data.map(items => {
            //     console.log(items.name);
            // })
        })

        
        

    }


    render() {
        const { navigation } = this.props
        return (
            <ScrollView>

                {/* <ChatCardList navigation={navigation} name="Subham" profilePic='https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' />
                <ChatCardList navigation={navigation} name="Ritam" profilePic='https://images.unsplash.com/photo-1581606559957-cefd05258b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' />
                <ChatCardList navigation={navigation} name="Avantika" profilePic="https://images.unsplash.com/photo-1581606559957-cefd05258b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                <ChatCardList navigation={navigation} name="Indra" profilePic="https://images.unsplash.com/photo-1581568686616-dcfe413c29f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                <ChatCardList navigation={navigation} name="Subhajit" profilePic="https://images.unsplash.com/photo-1581369263827-1fb8c1b22458?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80" />
                <ChatCardList navigation={navigation} name="Nabanita" profilePic="https://images.unsplash.com/photo-1581592944193-ca60b2366396?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1558&q=80" />
                <ChatCardList navigation={navigation} name="Mainak" profilePic="https://images.unsplash.com/photo-1581609784724-68d753c36494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" /> */}

                {
                    this.state.users.map((items, i)=> <ChatCardList navigation={navigation} name={items.name} userId={items.userId} profilePic={items.profilePic}/>)
                }

            </ScrollView>
        )
    }
}
