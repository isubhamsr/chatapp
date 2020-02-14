import React, { Component } from 'react'
import {View, Text, StyleSheet} from "react-native"

export default class FlexB extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.text}>Hello</Text>
                <Text style={style.text}>Subham</Text>
                <Text style={style.text}>Subham</Text>
            </View>
        )
    }
}

const style =  StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "red",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"

    },
    text : {
        flex : 1,
        fontSize : 40,
        textAlign : "center",
        // paddingTop : 50
        borderWidth : 3,
        backgroundColor: "skyblue"
    }
})