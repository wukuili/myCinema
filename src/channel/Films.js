import React from 'react';
import Main from "../component/Main";

class Films extends React.Component{
    render() {
        return (
            <Main url={'http://www.pupudy.com/film'} title={'电影'}/>
        );
    }
}
export default Films;