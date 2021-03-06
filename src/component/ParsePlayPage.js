import React from 'react';
import {Button, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Cheerio from 'react-native-cheerio';
import GridView from "react-native-super-grid";
import NavigationService from "./NavigationService";
import {NAVIGATE_PLAY} from "../constents/Constonts";

class ParsePlayPage extends React.PureComponent {
    //https://github.com/facebook/react-native/issues/13413
    static navigationOptions = {
        title: '详情',
    };
    state = {
        jujis: [],
        playChannelSource: [],
        isLoading: true,
        playUrl:'',
        selectChannel:'',
        selectJuji:'',

    };

    componentWillMount() {

    }

    componentDidMount() {
        this.parseUrl(this.props.navigation.getParam('playUrl'))
    }

    changePlaySource() {

    }

    parseHtml(html) {
        const $ = Cheerio.load(html);

        let body = $('.am-panel-default');
        let videourls = body.find('#video').attr('src');
        let videourlgo = body.find('#videourlgo').attr('href');
        let playChannelSource = [];
        let channelHtmlList = body.find('#xlu').find('button');

        channelHtmlList.each((index, item) => {
            let source = {
                name: '',//播放源名称
                playSourceUrl: ''
            };

            source.name = $(item).text();
            let onclick = $(item).attr('onclick');
            source.playSourceUrl = onclick.slice(8, onclick.lastIndexOf('\''));
            playChannelSource.push(source)
        });
        const theJujis = [];
        //可能有多个播放源 iqiyi youku 等
        let jujiSerial=$('.num-tab-main');
        jujiSerial.each((index,item)=>{
            let jujiList=$(item).find('a');
            theJujis.push({index:this.getTheJujiLists(jujiList,$)});
        });



        this.setState({
            playChannelSource: playChannelSource,
            jujis: theJujis.length==0?videourlgo:theJujis
        });

    }
    getTheJujiLists(jujiList,$){
        let jujis=[];
        jujiList.each((index, item) => {
            let juji = {
                id: '',
                onclick: ''
            };
            juji.id = $(item).text().trim();
            juji.onclick = $($(item)[0]).attr().href;
            jujis.push(juji)

        });
        return jujis;
    }
    parseUrl(url) {

        axios.get(url).then(
            response => {
                this.parseHtml(response.data)
                this.setState({
                    isLoading: false
                })


            }
        ).catch(
            error => {
                console.log(error)
            })

    }
    renderDetail ({playChannelSource,jujis})
    {
        const renderItem = (item) => (

            <Button title={item.id} onPress={() => {
                NavigationService.navigate(NAVIGATE_PLAY,{'url':(this.state.selectChannel==''?this.state.playChannelSource[0].playSourceUrl:this.state.selectChannel)+item.onclick})
            }}/>


        );
        return(
            <View style={{flex: 1}}>

                <Text>播放线路：</Text>
                <GridView
                    itemDimension={90}
                    items={playChannelSource}
                    style={styles.gridView}
                    renderItem={item => (
                        <Button title={item.name} onPress={() => this.setState({
                            selectChannel:item.playSourceUrl
                        })}/>
                    )}
                />
                <Text>剧集：</Text>
                {this.getJujiDetail(jujis,renderItem)}
            </View>
            )

    }
    getJujiDetail(jujis,renderItem){
        let theGridView={};
        return jujis.map((a,i)=>{
            console.log(a.index)
            return(
                <View style={{flex:1}}>
                <Text>源{i+1}</Text>
                <GridView itemDimension={60}
            items={Array.from(a.index)}
            style={styles.gridView}
            renderItem={renderItem}
            />
                </View>
                )

        })

    }
    render() {
        const {playChannelSource, jujis, isLoading,playUrl} = this.state;
        return (
            isLoading ?
                <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={'large'} animating
                                                                                     color={'grey'}/></View>
                : this.renderDetail({playChannelSource,jujis})

        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    },
    videoContainer:{
        flex: 1,
        justifyContent: 'center'
    }

});
export default ParsePlayPage;