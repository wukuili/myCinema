import React from 'react';
import {StyleSheet,ImageBackground} from 'react-native';

class Cover extends React.Component {

    render() {
        return (
            <ImageBackground source={{uri:this.props.picUrl}} loadingIndicatorSource={require('../../resources/images/default.jpg')} style={styles.backgroundImage}>

                {this.props.children}

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    }
});
export default Cover;