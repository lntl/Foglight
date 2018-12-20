import React, { Component } from 'react'
import { Link,StaticQuery, graphql } from 'gatsby'


export default () => (
  <StaticQuery
    query={graphql`
      query ArticleQuery {
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
      <div className="container">
        <ul>
          {data.allStrapiArticle.edges.map(document => (
            <li className="article">
              <h2>
                {document.node.title}
              </h2>
              <p>{document.node.content}</p>
            </li>
          ))}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )}
  />
)





// class AllArticles extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount(){
//     console.log(pageQuery);
//   }

//   render() {
//     return (
//       <div className="ariane">
//         test


//         <Link to="/">Home</Link>
//       </div>
//     );
//   }
// }

// export default AllArticles

// export const pageQuery = graphql`
//   query IndexQuery {
//     allStrapiArticle {
//       edges {
//         node {
//           id
//           title
//           content
//         }
//       }
//     }
//   }
// `