import React, { Component } from "react";
import Header from '../components/header'
import Articles from '../components/articles'

class SecondPage extends Component {
  render() {
    return (
      <div>
        <Header siteTitle="Tous les articles"/>
        <Articles/>
      </div>
    );
  }
}

export default SecondPage
