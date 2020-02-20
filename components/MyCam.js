import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';


class MyCam extends Component {
    state = {
        video: null,
        picture: null,
        recording: false
    };

    saveVideo = async () => {
        const { video } = this.state;
        const asset = await MediaLibrary.createAssetAsync(video.uri);
        if (asset) {
            this.setState({ video: null });
        }
    };

    StopRecord = async () => {
        this.setState({ recording: false }, () => {
            this.cam.stopRecording();
        });
    };

    StartRecord = async () => {
        if (this.cam) {
            this.setState({ recording: true }, async () => {
                const video = await this.cam.recordAsync();
                this.setState({ video });
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
        const { recording, video } = this.state;
        return (
            <Camera
                ref={cam => (this.cam = cam)}
                // zoom ={ 1}
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
        );
    }
}

// class RecVideo extends Component {
//   state = {
//     showCamera: false
//   };

//   showCamera = async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERAROLL);

//     if (status === "granted") {
//       this.setState({ showCamera: true });
//     }
//   };

//   render() {
//     const { showCamera } = this.state;
//     return (
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           flex: 1,
//           width: "100%"
//         }}
//       >
//         {showCamera ? (
//           <MyCam />
//         ) : (
//           <TouchableOpacity onPress={this.showCamera}>
//             <Text> Show Camera </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   }
// }

export default MyCam;
