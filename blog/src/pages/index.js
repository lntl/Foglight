import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Articles from '../components/articles'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <div className="content-site">
      <div className="container">
      <h1>Page d'accueil</h1>
        <Image />
      </div>
    </div>
  </Layout>
)

export default IndexPage
