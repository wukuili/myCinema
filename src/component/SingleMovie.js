import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import Cover from "./Cover";
import NavigationService from "./NavigationService";
import {NAVIGATE_DETAIL} from "../constents/Constonts";

class SingleMovie extends React.Component {
    onPress = () => {
        NavigationService.navigate(NAVIGATE_DETAIL,{playUrl:this.props.playUrl})
    };

    render() {
        const {picUrl, title, latest, actors,playUrl} = this.props;
        return (

            <TouchableOpacity style={styles.viewStyle} onPress={this.onPress} >

                <Cover picUrl={picUrl}>
                    <Text style={styles.spanStyles}>{latest}</Text>
                </Cover>

                <Text style={styles.titleStyle} >{title}</Text>
                <Text style={styles.actorStyle} ellipsizeMode={'tail'} numberOfLines={1}>{actors}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create(
    {
        spanStyles: {
            right: 4,
            bottom: 4,
            position:'absolute',
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: '#fff',
            borderRadius: 2,
            justifyContent: 'flex-end'
        },
        titleStyle:{
            paddingHorizontal: 5,
            paddingTop:7,
            paddingBottom:3,
            fontSize:14
        },
        actorStyle:{
            fontSize: 12,
            color: '#999',
            marginVertical: 0,
            marginHorizontal: 5,


        },
        viewStyle:{
            flex: 1,
            height:150,
            justifyContent: 'flex-end',
            borderRadius: 5,
        }
    }
);
export default SingleMovie;