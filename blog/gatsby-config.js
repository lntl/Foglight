module.exports = {
  siteMetadata: {
    title: 'LN',
    description: 'description du site',
    author: '@gatsbyjs',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        contentTypes: [
          'article'
        ]
      },
    },
    `gatsby-transformer-remark`,
    // 'gatsby-plugin-google-fonts',
    // {
    //   resolve: 'gatsby-source-strapi',
    //   options: {
    //     fonts: [
    //       `Roboto`,
    //       `source sans pro\:300,400,500,700`,
    //     ]
    //   }
    // },
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
  ],
}
