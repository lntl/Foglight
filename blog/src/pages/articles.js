import React, { Component } from 'react';
import Header from '../components/header'
import Articles from '../components/articles'
import SEO from '../components/seo'

class SecondPage extends Component {
  render() {
    return (
      <div>
        <SEO title="Articles" keywords={['gatsby', 'application', 'react']} />
        <Header siteTitle="Articles"/>
        <div className="content-site">
          <div className="container">
            <h1>Liste d'articles</h1>
            <Articles/>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondPage
