import React from 'react';
import {
    StyleSheet
} from 'react-native';
import axios from 'axios';
import Cheerio from 'react-native-cheerio';
import GridView from 'react-native-super-grid';
import SingleMovie from "./SingleMovie";
import * as ConsTants from "../constents/Constonts";
class ParseUrl extends React.Component {
    state = {
        showList: [],
        totalPage: '',
        currentPage: '',
        pages: []
    };
    parseHtml(html) {
        const $ = Cheerio.load(html);
        let list = $('.g-clear').find('li');
        const datas = [];
        list.each((index, item) => {
            const dramaItem = {
                title: '', //名称
                latest: '', //最新剧集
                picUrl: '', //图片地址
                playUrl: '', //播放地址
                actors: '' //演员
            };
            let link = $(item).find('a');
            link.each((i,a)=>{//解析具体影片
                let aTag=$(a);

            dramaItem.actors = aTag.find('.star').text();
            dramaItem.picUrl = aTag.find('img').attr('src');
            dramaItem.latest = aTag.find('.hint').text();
            dramaItem.title = aTag.find('.s1').text();
            dramaItem.playUrl = ConsTants.HOST_URL + aTag.attr('href')


            });
            datas.push(dramaItem);


        });


         //解析分页
         let pageHtml=$('.paging').find('a');
         let currentPageHtml=$('a').filter('.current');
         let currentPage=currentPageHtml.text();
         console.log(currentPageHtml.attr('href'));
         let totalPage='';
         //仅设置一次总页数
         if(currentPage==1){
             totalPage=$(pageHtml).eq(-2).text();
             this.setState({
                 totalPage:totalPage
             })
         }

        this.setState({
            showList: datas,
            totalPage:totalPage,
            currPage:currPage,
            pages:
        });
    }
    parseUrl(url) {

        axios.get(url).then(
            response => {
                this.parseHtml(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            })

    }

    componentDidMount() {

        // this.parseUrl(this.props.url)

    }
    componentWillMount() {
        this.parseUrl(this.props.url)

    }
    render() {
        return ( <
            GridView itemDimension = {
                130
            }
            items = {
                this.state.showList
            }
            style = {
                styles.gridView
            }
            renderItem = {
                item => ( <
                    SingleMovie picUrl = {
                        item.picUrl
                    }
                    title = {
                        item.title
                    }
                    latest = {
                        item.latest
                    }
                    actors = {
                        item.actors
                    }
                    playUrl = {
                        item.playUrl
                    }
                    />
                )
            }
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