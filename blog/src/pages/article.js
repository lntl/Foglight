import React from 'react'
import { Link,StaticQuery, graphql } from 'gatsby'

const urlParams = new URLSearchParams(document.location.search)
const key = urlParams.get('id');
const request = 'query={graphql`query ArticleQuery {strapiArticle(id: {eq: '+key+'}){ title content }}`}'

export default () => (
  <StaticQuery
    query={graphql`
      query ArticleQuery {
        strapiArticle(id: {eq: "5c1ba4138c1a7740f0c04a03"}) {
          title
          content
        }
      }
    `}
    render={data => (
      <div>
        {console.log(key)}
        <h1>{data.strapiArticle.title}</h1>
        <p>{data.strapiArticle.content}</p>
      </div>
    )}
  />
)