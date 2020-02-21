import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Image } from "react-native"
import io from "socket.io-client"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import KeyboardSpacer from "react-native-keyboard-spacer"
import Messages from './Messages'
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av"
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import MyCam from '../components/MyCam'



export default class Chat extends Component {

    typingTimer = null;

    constructor(props) {
        super(props)

        this.state = {
            chat: "",
            chatMsgs: [],
            typing: "",
            name: props.navigation.getParam("name"),
            lastPress: 0,
            image: null,
            imageHeight: null,
            imageWidth: null,
            users: [],
            video: null,
            showCamera: false
        }
    }

    componentDidMount() {
        this.socket = io("http://325a12f3.ngrok.io")
        console.log("User name", this.props.navigation.getParam("name"));

        this.socket.emit("new-user", this.state.name)

        this.socket.on("chatmessages", msg => {
            console.log("Resive msg ", msg);

            this.setState({
                chatMsgs: [...this.state.chatMsgs, msg.chat],
                name: msg.name
            })
            console.log(this.state.chatMsgs);
            // this.state.chatMsgs.map(item => {
            //     console.log(item);

            // })
            // var name = msg.name
        })


        this.socket.on("sent-video", data=>{
            console.log("from sent videos", data);
            this.setState({
                video : data
            })
        })
        // this.sendLastMsgToPrent



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

        this.socket.on("typingStop", () => {
            this.setState({
                typing: ""
            })
        })


        this.socket.on("base-img", (data) => {
            console.log("Base Im", typeof (data));
            this.setState({
                // image : data
                chatMsgs: [...this.state.chatMsgs, data]
            })
            // Split the base64 string in data and contentType
            // var block = data.split(";");
            // // Get the content type of the image
            // var contentType = block[0].split(":")[1];// In this case "image/gif"
            // // get the real base64 content of the file
            // var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

            // // Convert it to a blob to upload
            // var blob = this.b64toBlob(realData, contentType);

            // console.log("Blob", blob);


        })

        // this.socket.on("base-video", (data) => {
        //     this.setState({
        //         video: data
        //     })
        // })

        // this.getPermissionAsync();

        this.socket.on("get-users", data => {
            // data.map(item=>{
            //     console.log(item);
            //     // this.state.users.push(item)
            //     this.setState({
            //         users : [...item]
            //     })
            // })
            console.log("GEt Users", data);

            // data.map(item=>{
            //     this.setState({
            //         users : [...this.state.users, item]
            //     })
            // })


            this.setState({
                users: data
            }, () => {
                console.log("After state change", this.state.users);

            })
            console.log("Online Users");
            console.log(this.state.users);


        })

        // this.socket.on("sent-image-clint", data => {
        //     this.setState({
        //         image: data
        //     })
        // })

        // this.forceUpdate()
        // this.createBlobImg(this.state.image)

    }

    // createBlobImg = (image) => {

    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", image);
    //     xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    //     xhr.onload = function () {
    //         blob = xhr.response;//xhr.response is now a blob object
    //     }
    // }

    b64toBlob = (b64Data, contentType) => {
        contentType = contentType || '';
        let sliceSize = 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        // console.log("Blob", blob);

        return blob;
    }

    sendLastMsgToPrent = () => {
        lastMsg = this.state.chatMsgs.length - 1
        this.state.chatMsgs[lastMsg]
        this.props.navigation.goBack({ lastMsg: this.state.name });
        this.props.navigation.state.params.returnMsg(this.state.name);
    }


    componentWillUnmount() {
        clearTimeout(this.typingTimer);

        lastMsg = this.state.chatMsgs.length - 1
        this.state.chatMsgs[lastMsg]
        this.props.navigation.state.params.returnMsg(this.state.chatMsgs[lastMsg].length < 100 ? this.state.chatMsgs[lastMsg] : "photo");
        this.props.navigation.goBack({ lastMsg: this.state.name });
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

        this.socket.emit("msg", data)
        // this.socket.emit(this.props.navigation.getParam("name"), data)

        // console.log(this.state.chat);

        this.setState({
            chat: ""
        })

        this.socket.emit("typingOver")
    }

    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    //   }

    sendImage = async () => {
        // ImagePicker.launchImageLibraryAsync()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //   allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        // if (!result.cancelled) {
        //     var blob = null
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("GET", result.uri);
        //     xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
        //     xhr.onload = function () {
        //         blob = xhr.response;//xhr.response is now a blob object
        //         console.log("Blob Storage");
        //         console.log(blob)
        //         console.log(blob._data.blobId);

        //     }
        //     console.log("Blob, name", blob);

        //     // this.socket.emit("sent-image",blob._data.name)
        //     xhr.send();

        this.toDataURL(result.uri, (dataUrl) => {
            // console.log(dataUrl);
            this.socket.emit("sent-image", dataUrl)
            console.log("img sent done");

        })


        this.setState({
            // image : result.uri,
            imageHeight: result.height,
            imageWidth: result.width
        });
        // }
    }

    toDataURL = (url, callback) => {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onload = function () {
            var fileReader = new FileReader();
            fileReader.onloadend = function () {
                callback(fileReader.result);
            }
            fileReader.readAsDataURL(httpRequest.response);
        };
        httpRequest.open('GET', url);
        httpRequest.responseType = 'blob';
        httpRequest.send();
    }


    sendVideos = () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     //   allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1
        // });

        // console.log(result);

        // this.toDataURL(result.uri, (dataUrl) => {
        //     // console.log(dataUrl);
        //     this.socket.emit("sent-video", dataUrl)
        //     console.log("img sent done");
        // })

        // this.setState({
        //     // video: result.uri,
        //     imageHeight: result.height,
        //     imageWidth: result.width
        // });
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
        const users = []
        let name = navigation.getParam("name")
        users.push(name)
        // console.log("Users from render",users);

        const chatMsgs = this.state.chatMsgs.map((item, i) => (
            (item.length < 100) ? <Text key={i}>From {name}: Message: {item}</Text> : <Image key={i} source={{ uri: item }} style={{ width: 200, height: 200 }} />
        ))

        const messages = [
            { isOwnMessage: false, message: "Hi" },
            { isOwnMessage: true, message: "how can I help you" },
            { isOwnMessage: false, message: "Hi" }
        ]

        // const onlineUsers = 


        const bubble = messages.map((item, i) => <Messages {...item} key={i} />)
        // const spacer = Platform.OS === "ios" ? <KeyboardSpacer /> : <KeyboardSpacer />
        return (

            <View style={style.container} >

                <ScrollView>
                    <View >
                        <Text>Chat</Text>
                        <Text>User : {this.state.name}</Text>
                        {
                            // users.map(item=>(
                            //     // console.log("Online USer from return",item)
                            //     <Text key={Math.random()}>Online Users: {item}</Text>
                            // ))
                            // console.log("Online USers from return")
                            // onlineUsers
                            this.state.users.map((items, i) => (<Text key={i}>{items}</Text>))
                        }

                        <Text>{this.state.typing}</Text>



                        {/* {num} */}
                        {chatMsgs}
                        <Video
                            source={{ uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FchatApp-fad2e7e8-558a-4905-bb4f-c71d77c0c1a5/Camera/13b1e28d-d66a-4913-b92f-a52df9266dec.mp4" }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={true}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={{ width: 300, height: 300 }}
                        />
                        {/* <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} /> */}

                    </View>
                    {/* <View style={{ flex: 1 }}>
                        {bubble}
                    </View> */}
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
                                    // window.alert('Stopped typing !');
                                }
                            }, 5000);


                        }}
                    />

                    <TouchableOpacity>
                        <Text style={style.sendButton}
                            onPress={this.sentMessage}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={style.sendButton}
                            onPress={this.sendImage}>Send Photos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={style.sendButton}
                            onPress={() => this.props.navigation.navigate('MyCam')}>Send Videos</Text>
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
