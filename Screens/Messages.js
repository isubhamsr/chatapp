import React from 'react'
import {View, Text, StyleSheet} from "react-native"

export default function Messages(props) {
    return (
        <View style={[style.bubble, props.isOwnMessage && style.ownBubble]}>
            <Text style={[style.messageTExt, props.isOwnMessage && style.ownMessageText]}>
                {props.message}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    bubble : {
        width : 250,
        padding : 10,
        marginVertical : 5,
        marginHorizontal : 10,
        backgroundColor : "#ececec",
        borderRadius : 10,
    },
    ownBubble : {
        backgroundColor : "#457DE5FF",
        alignSelf : "flex-end"
    },
    messageTExt : {
        color : "#333333"
    },
    ownMessageText : {
        color : "#ffffff"
    }
})
