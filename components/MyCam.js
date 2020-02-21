import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Audio, Video } from "expo-av"
import { Button } from "react-native-paper";




export default class MyCam extends Component {
    // state = {
    //   video: null,
    //   picture: null,
    //   recording: false
    // };

    constructor(props) {
        super(props)

        this.state = {
            camType: Camera.Constants.Type.back,
            camPermission: false,
            storagePermission: false,
            audioPermission: false,
            recording: false,
            video: null,
            hasPermission: false
        }
    }

    async componentDidMount() {
        this.camPermission()
        this.audioPermission()
        this.storagePermission()

        // const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);

        // if (status === 'granted') {
        //     this.setState({
        //         hasPermission: true
        //     })
        // }
    }

    camPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            this.setState({
                camPermission: true
            })
        }
    }

    audioPermission = async () => {
        console.log("click");

        const { status } = await Audio.requestPermissionsAsync()

        if (status === 'granted') {
            this.setState({
                audioPermission: true
            })
        }
    }

    storagePermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync()

        if (status === 'granted') {
            this.setState({
                storagePermission: true
            })
        }
    }

    saveVideo = async () => {
        const { video } = this.state;
        console.log("From Save video", video);

        let fromData = new FormData()
        fromData.append("photo", {
            name: "video.mp4",
            uri: video.uri,
            type: 'video/mp4'
        })

        fetch("http://325a12f3.ngrok.io/upload", {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: fromData
        })
            .then(res => res.json())
            .then(res2 => {
                // console.log(res2.message);
                // alert(res2.message)
                if (res2.err === false) {
                    alert(res2.message)
                    this.props.navigation.navigate('Chat')
                    // const resetAction = StackActions.reset({
                    //     index: 0,
                    //     actions: [NavigationActions.navigate({ routeName: 'LandingPage' })],
                    //   });
                    //   this.props.navigation.dispatch(resetAction);

                } else {
                    alert(res2.message)
                    // this.props.navigation.navigate('Auth')
                }

            })
            .catch(err => {
                console.log("From Catch2", err.message);

            })


        // const asset = await MediaLibrary.createAssetAsync(video.uri);
        // if (asset) {
        //     this.setState({ video: null }, ()=>{console.log("VIdeo saved");
        //     });
        // }
    };

    StopRecord = async () => {
        this.setState({ recording: false }, () => {
            console.log("From Stop Rec", this.state.video);
            this.cam.stopRecording();

        });
    };

    StartRecord = async () => {
        if (this.cam) {
            this.setState({ recording: true }, async () => {
                const video = await this.cam.recordAsync();
                console.log("From Start Record", video.uri);

                this.setState({ video: video });
            });
        }
    };

    toogleRecord = () => {
        const { recording } = this.state;

        if (recording) {
            this.StopRecord();
        } else {
            this.StartRecord();
        }
    };

    render() {
        const { recording, video, hasPermission, camPermission, audioPermission, storagePermission } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {
                    camPermission && audioPermission && storagePermission ? (
                        <Camera
                            ref={cam => (this.cam = cam)}
                            style={{
                                justifyContent: "flex-end",
                                alignItems: "center",
                                flex: 1,
                                width: "100%"
                            }}
                        >
                            {video && (
                                <TouchableOpacity
                                    onPress={this.saveVideo}
                                    style={{
                                        padding: 20,
                                        width: "100%",
                                        backgroundColor: "#fff"
                                    }}
                                >
                                    <Text style={{ textAlign: "center" }}>save</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                onPress={this.toogleRecord}
                                style={{
                                    padding: 20,
                                    width: "100%",
                                    backgroundColor: recording ? "#ef4f84" : "#4fef97"
                                }}
                            >
                                <Text style={{ textAlign: "center" }}>
                                    {recording ? "Stop" : "Record"}
                                </Text>
                            </TouchableOpacity>
                        </Camera>
                    ) : (
                            <View>
                                <Text>access denied</Text>
                                <Button
                                    mode="contained"
                                    onPress={this.audioPermission}
                                >
                                    Get Access
                            </Button>
                            </View>
                        )
                }

            </View>
        );
    }
}




// export default class MyCam extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             camType: Camera.Constants.Type.back,
//             hasPermission: false,
//             recording: false,
//             video: null
//         }
//     }

//     async componentDidMount() {
//         const { status } = await Camera.requestPermissionsAsync()
//         if (status === 'granted') {
//             this.setState({
//                 hasPermission: true
//             })
//         }
//     }

//     startRecording = async () => {
//         if (this.cam) {
//             this.setState({
//                 recording: true
//             }, async () => {
//                 const video = await this.cam.recordAsync()
//                 console.log(video.uri);
//                 this.setState({
//                     video: video.uri
//                 })
//             })
//         }
//     }

//     stopRecording = async () => {
//         this.setState({
//             recording: false
//         }, () => {
//             this.cam.stopRecording()
//         })
//     }

//     toogleRecord = () => {
//         const { recording } = this.state;

//         if (recording) {
//             this.stopRecording();
//         } else {
//             this.startRecording();
//         }
//     };

//     render() {
//         const { hasPermission } = this.state
//         return (
//             <View style={{ flex: 1 }}>

//                 {/* {hasPermission ? ( */}
//                 <Camera
//                     ref={cam => (this.cam = cam)}
//                     tyle={{
//                         justifyContent: "flex-end",
//                         alignItems: "center",
//                         flex: 1,
//                         width: "100%"
//                     }}
//                     type={this.state.camType}
//                 >


//                     <TouchableOpacity
//                         onPress={this.toogleRecord}
//                         style={{
//                             padding: 20,
//                             width: "100%",
//                             backgroundColor: "#4fef97"
//                         }}
//                     >
//                         <Text style={{ textAlign: "center" }}>{this.state.recording ? "Stop" : "Record"}</Text>
//                     </TouchableOpacity>


//                 </Camera>
//                 {/* ) : (
//                         <Text>No access to camera</Text>
//                     )} */}

//             </View>
//         )
//     }
// }
