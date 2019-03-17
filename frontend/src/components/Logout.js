import React from 'react';
import {Redirect} from 'react-router-dom'

export default class Logout extends React.Component {
    componentWillMount(){
        localStorage.removeItem('auth-token');
    }

    render(){
        return (
            <Redirect to='/'/>
        );
    }
}