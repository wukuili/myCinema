import React, { Component } from 'react';
import {Text,YellowBox } from 'react-native';
import ParsePlayPage from "./component/ParsePlayPage";
import PlayPage from "./component/PlayPage";
import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
import NavigationService from "./component/NavigationService";
import HotTvs from "./channel/HotTvs";
import Films from "./channel/Films";

export default class App extends Component {
    componentWillMount(){
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    }
    render() {
        return (
          //<ParsePlayPage playUrl={'http://www.pupudy.com/play?make=dianshiju&id=RLJpbH7lRGHlNX.html'}/>
            <RootStack
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}
const HotTvsStack=createStackNavigator({
    Home:HotTvs,
    Detail:ParsePlayPage,
    Play:PlayPage
},{
    initialRouteName:'Home',
    navigationOptions:{
        headerTitle: <Text>热门电视剧</Text>
    }
});
const FilmsStack=createStackNavigator({
    Home:Films,
    Detail:ParsePlayPage,
    Play:PlayPage
},{
    initialRouteName:'Home',
    navigationOptions:{
        headerTitle: <Text>电影</Text>
    }
});
const RootStack=createBottomTabNavigator({
    HotTvs:HotTvsStack,
    Films:FilmsStack
},
    {
        initialRouteName:'HotTvs',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
);
