import React, { Component } from 'react';
import Header from '../components/header';
import DateFormat from 'dateformat';



class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    let uri = document.location.search;
    uri = uri.split('=');
    this.mounted = true;
    fetch("http://localhost:1337/articles?id="+uri[1])
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
    return (
      <div>
        <Header siteTitle="Article"/>
        <div className="content-site">
          <div className="container">
            <h1>Article</h1>
            <ul>
              {this.state.items.map((item)=>
                <li key={item.id}>{item.title}
                <span className="date-time">
                  {item.create_date = DateFormat(item.create_date)}
                </span>
                <p>{item.content}</p></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Article














// import React from 'react'
// import { Link,StaticQuery, graphql } from 'gatsby'

// const urlParams = new URLSearchParams(document.location.search)
// const key = urlParams.get('id');
// const request = 'query={graphql`query ArticleQuery {strapiArticle(id: {eq: '+key+'}){ title content }}`}'

// export default () => (
//   <StaticQuery
//     query={graphql`
//       query ArticleQuery {
//         strapiArticle(id: {eq: "5c1ba4138c1a7740f0c04a03"}) {
//           title
//           content
//         }
//       }
//     `}
//     render={data => (
//       <div>
//         <h1>{data.strapiArticle.title}</h1>
//         <p>{data.strapiArticle.content}</p>
//       </div>
//     )}
//   />
// )