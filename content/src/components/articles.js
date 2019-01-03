import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import TextTruncate from 'react-text-truncate';

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
          <li className="articles" key={document.node.id} >
            <h2>
              {document.node.title}
            </h2>
            <p>
            <TextTruncate
                line={4}
                truncateText="…"
                text={document.node.content}
            />
            </p>
            <Link className="btn-std" to={"/article?id="+document.node.id}>Voir plus</Link>
          </li>
        ))}
      </ul>
    )}
  />
)
