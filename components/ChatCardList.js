import React, { Component } from 'react'
import {View, Text, ScrollView, Image} from "react-native"
import {Card, Title, Paragraph, Button } from "react-native-paper"
import {Ionicons} from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native-gesture-handler'



export default class ChatCardList extends Component {
    render() {
        return (
            
            <View style={{margin:2}}>
                <Card style={{elevation:5}}>
                    <View style={{flexDirection:"row", padding:10}}>
                        <View >
                            <Image
                            style={{height:50, width:50, borderRadius:25}} 
                                source={{uri: this.props.profilePic}}
                            />
                        </View>
                        <View>
                            <Card.Content>
                                <TouchableOpacity>
                                    <Title onPress={() => this.props.navigation.navigate('Chat',{name : this.props.name})}>{this.props.name}</Title>
                                </TouchableOpacity>
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
