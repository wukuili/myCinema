import React, { Component } from 'react';
import ParseUrl from "./ParseUrl";

 class Main extends Component {

    render() {
        console.log(this.props)
        return (
            <ParseUrl url={this.props.url}/>
        );
    }
}
export default Main;
