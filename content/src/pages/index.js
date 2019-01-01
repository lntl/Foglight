import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <div className="content-site">
      <div className="slider-home" style={{backgroundImage:"url(/images/background-home.jpg)"}}></div>
      <div className="container">
      <h1>Accueil</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida urna rhoncus quam egestas blandit. In hac habitasse platea dictumst. In suscipit ac turpis vitae dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sit amet leo turpis. Praesent quis aliquam dui. Fusce sit amet augue tempor, commodo erat a, consectetur mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas pulvinar velit et ex rutrum vulputate. Donec tincidunt hendrerit velit a pharetra. Fusce iaculis, est vitae laoreet consectetur, ex mi porta massa, sit amet convallis ante est quis urna. Aenean rhoncus iaculis tortor, vel cursus ante feugiat nec.
        Duis finibus suscipit sem in tristique. Mauris condimentum tempor ex et volutpat. Morbi dictum pellentesque urna, tempor accumsan arcu. Nullam dignissim libero et lacus commodo pretium. Suspendisse potenti. Mauris tempus a nibh id consequat. Nulla semper eros odio, non pulvinar est rhoncus vitae. Nulla sed sapien vitae leo laoreet consequat.</p>
      </div>
    </div>
  </Layout>
)

export default IndexPage
