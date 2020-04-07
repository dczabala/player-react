import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

const audioList = [
    {
      title: 'Play mp3 sound from Local',
      isRequire: true,
      url: require('./song1.mp3'),
    }]

var sound1;
  function playSound(item, index) {
    if (index == 0) {
        sound1 = new Sound(item.url, (error, sound) => {
        if (error) {
            alert('error' + error.message);
            return;
        }
        sound1.play(() => {
            sound1.release();
        });
        });}}
    function stopSound(item, index){
        if (index == 0 && sound1) {
          sound1.pause();
        }}

    function componentWillUnmount() {
            sound1.release();
        }

class App extends Component {
    constructor(props) {
        super(props);
        Sound.setCategory('Playback', true); // true = mixWithOthers
        this.state = {
          tests: {},
        };
      }
    render() {
        
        return (
            
            <SafeAreaView style={styles.container}>
               
                <View style={{ alignItems: "center" }}>
                  {/* Playlist name marginTop: 150 for mobile*/}
                    <View style={{ alignItems: "center", marginTop: 40 }}>
                        <Text style={[styles.textLight]}>PLAYLIST NAME</Text>
                    </View>
                    {/* Book Cover picture */}
                    <View style={styles.coverContainer}>
                        <Image source={require("./bookCover.jpg")} style={styles.cover}></Image>
                    </View> 
                    {/* Song name and artist */}
                    <View style={{ alignItems: "center", marginTop: 32 }}>
                        <Text style={[styles.textDark]}>Book Title</Text>
                        <Text style={[styles.text]}>Author</Text>
                    </View>
                </View>
                
               { /* Slider */}
                <View style={{ margin: 32, alignSelf: "center"}}>
                    <Slider style={styles.track}
                        minimumValue={0}
                        //maximumValue={this.state.trackLength}
                        trackStyle={styles.track}
                        thumbTintColor="#3D425C"
                        minimumTrackTintColor="#5C5C5C"
                        //onValueChange={seconds => this.changeTime(seconds)}
                    ></Slider>
                </View> 
                {audioList.map((item, index) => {
                    return (
                /* Buttons */
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  {/* Previous button */}
                    <TouchableOpacity>
                         <Image source={require("./previous.png")} style={styles.buttons}></Image>
                    </TouchableOpacity>
                    
                    {/* Play button */}
                    <TouchableOpacity  onPress={() => {
                      return playSound(item, index);
                    }}>
                        <Image source={require("./play.png")} style={styles.playPausebutton}></Image>
                    </TouchableOpacity>

                    {/* Pause button */}
                    <TouchableOpacity onPress={() => {
                      return stopSound(item, index);
                    }}>
                        <Image source={require("./pause.png")} style={styles.playPausebutton}></Image>
                    </TouchableOpacity>

                  {/* Next button */}
                    <TouchableOpacity>
                         <Image source={require("./next.png")} style={styles.buttons}></Image>
                    </TouchableOpacity>
                </View>
                );
                })}
            </SafeAreaView>
        );
    }
}
export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAEC"
    },
    textLight: {
        color: "#B6B7BF",
        fontSize: 12,
    },
    text: {
        color: "#8E97A6",
        fontSize: 16, 
        marginTop: 8
    },
    textDark: {
        color: "#3D425C",
        fontSize: 20, 
        fontWeight: "500",
    },
    coverContainer: {
        marginTop: 32,
        width: 250,
        height: 250,
    },
    cover: {
        width: 250,
        height: 250
    },
    track: {
        /*for mobile
        width: 350,*/
        width: 350,
        height: 40,
        
    },
    buttons:{
        width: 25,
        height: 25,
    },
    playPausebutton: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
    },
});