import React from 'react';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import Cheerio from 'react-native-cheerio';
import GridView from 'react-native-super-grid';
import SingleMovie from "./SingleMovie";
import * as ConsTants from "../constents/Constonts";
class ParseUrl extends React.Component{
    state={showList:[]};
    parseHtml(html){
        const $=Cheerio.load(html);
        let body=$('.g-clear').find('li');
        const datas=[];
        body.each((index,item)=>{
            const dramaItem={
                title:'',//名称
                latest: '',//最新剧集
                picUrl: '',//图片地址
                playUrl:'',//播放地址
                actors: ''//演员
            };
            let link=$(item).find('a');
            link.each((i,a)=>{//解析具体影片
                let aTag=$(a);

                    dramaItem.actors=aTag.find('.star').text();
                    dramaItem.picUrl=aTag.find('img').attr('src');
                    dramaItem.latest=aTag.find('.hint').text();
                    dramaItem.title=aTag.find('.s1').text();
                    dramaItem.playUrl=ConsTants.HOST_URL+aTag.attr('href')


            });
            datas.push(dramaItem);


        });
        this.setState({
            showList:datas
        })
    }
    parseUrl(url){

        axios.get(url).then(
            response=>{
                this.parseHtml(response.data)
            }
        ).catch(
            error=>{console.log(error)})

    }
    componentDidMount(){

        // this.parseUrl(this.props.url)

    }
    componentWillMount(){
        this.parseUrl(this.props.url)

    }
    render() {
        return (
            <GridView
                itemDimension={130}
                items={this.state.showList}
                style={styles.gridView}
                renderItem={item => (
                    <SingleMovie picUrl={item.picUrl} title={item.title} latest={item.latest} actors={item.actors} playUrl={item.playUrl}/>
                )}
            />
        );
    }
}
const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    }
});
export default ParseUrl;