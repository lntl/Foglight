import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'


export default () => (
  <StaticQuery
    query={graphql`
      query ArticlesQuery {
        allStrapiArticle {
          edges {
            node {
              id
              title
              content
            }
          }
        }
      }
    `}
    render={data => (
      <ul>
        {data.allStrapiArticle.edges.map(document => (
          <li className="article" key={document.node.id} >
            <h2>
              {document.node.title}
            </h2>
            <p>{document.node.content}</p>
            <Link className="btn" to={"/article?id="+document.node.id}>Voir plus</Link>
          </li>
        ))}
      </ul>
    )}
  />
)
