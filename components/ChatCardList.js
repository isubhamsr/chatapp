import React, { Component } from 'react'
import { View, Text, ScrollView, Image } from "react-native"
import { Card, Title, Paragraph, Button } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Video } from "expo-av"



export default class ChatCardList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: ""
        }
    }

    returnMsg = (message) => {
        this.setState({
            message: message
        })
    }

    // componentDidMount() {
    //     const { navigation } = this.props
    //     let users = navigation.getParam("lastMsg")
    //     this.setState({
    //         message: users
    //     })
    // }

    render() {
        return (

            <View style={{ margin: 2 }}>
                <Card style={{ elevation: 5 }}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <View >
                            <Image
                                style={{ height: 50, width: 50, borderRadius: 25 }}
                                source={{ uri: this.props.profilePic }}
                            />
                        </View>
                        <View>
                            <Card.Content>
                                <TouchableOpacity>
                                    <Title onPress={() => this.props.navigation.navigate('Chat', { returnMsg: this.returnMsg, name: this.props.name })}>{this.props.name}</Title>
                                    <Title>{this.state.message}</Title>
                                </TouchableOpacity>
                                {/* <Video
                                    // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                    // rate={1.0}
                                    // volume={1.0}
                                    // isMuted={false}
                                    // resizeMode="cover"
                                    // shouldPlay
                                    // isLooping
                                    // style={{ width: 300, height: 300 }}
                                /> */}
                            </Card.Content>
                        </View>
                        {/* <View>
                        <Card.Content>
                                <Paragraph>Available At</Paragraph>
                                <View style={{flexDirection: "row"}}>
                                    <Ionicons name="md-calendar" size={20}/>
                                    <Text style={{fontSize:15, fontWeight:"bold", marginLeft:10}}>14/2/2020</Text>
                                </View>
                            </Card.Content>
                        </View> */}
                    </View>
                    {/* <View style={{flexDirection:"row", justifyContent:"space-around", padding:10}}>
                            <Button mode="contained">
                                Chat
                            </Button>
                            <Button mode="contained">
                                Chat
                            </Button>
                    </View> */}
                </Card>
            </View>

        )
    }
}
