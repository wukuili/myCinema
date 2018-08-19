import React from 'react';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import Cheerio from 'react-native-cheerio';
import GridView from 'react-native-super-grid';
import SingleMovie from "./SingleMovie";
import * as ConsTants from "../constents/Constonts";
class ParseUrl extends React.Component{
    state={
        showList:[],
        totalPage:1,//总页数
        currPage:0,//当前页
        pages:[{index:1,url:this.props.url}]//页码信息
    };
    parseHtml(html){
        const $=Cheerio.load(html);
        let {totalPage,currPage,pages}=this.state;
        let list=$('.g-clear').find('li');
        const datas=[];
        list.each((index,item)=>{
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
        //解析页码
        let page=$('.paging').find('a');
        page.each(item=>{
            pages.push({
                index:$(item).text(),
                url:HOST_URL+$(item).attr('href')
            })
        })
        totalPage=$(page).eq(-2).text();
        currPage=$(page).filter('.current').text();
        console.log(currPage+'-=-='+totalPage);

        this.setState({
            showList:datas,
            totalPage:totalPage,
            currPage:currPage,
            pages:
        });
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