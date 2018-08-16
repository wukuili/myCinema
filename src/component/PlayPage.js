import React from 'react';
import axios from 'axios';
import WebView from 'react-native-android-fullscreen-webview-video';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
const url='http://www.1717yun.com/jx/ty.php?url=http://www.iqiyi.com/v_19rqyx6u0o.html?vfm=f_191_360y';

class PlayPage extends React.Component{
    static navigationOptions = {
        title: '播放页',
    };
    state={
     data:''
    }
    getPlay(){
        axios.get(url).then(
            response=>{
                this.setState({
                    data:response.data
                })
            }
        )
    }
componentDidMount(){
    // this.getPlay();
}
    render() {
        console.log(this.props.navigation.getParam('url'))
        return (
                <WebView
                    source={{uri: this.props.navigation.getParam('url')}}
                />

        );
    }
}

export  default PlayPage;