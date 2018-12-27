const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\Users\\Killian\\repo\\gatsby-strapi\\content\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Users\\Killian\\repo\\gatsby-strapi\\content\\src\\pages\\404.js"))),
  "component---src-pages-article-js": hot(preferDefault(require("C:\\Users\\Killian\\repo\\gatsby-strapi\\content\\src\\pages\\article.js"))),
  "component---src-pages-articles-js": hot(preferDefault(require("C:\\Users\\Killian\\repo\\gatsby-strapi\\content\\src\\pages\\articles.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Users\\Killian\\repo\\gatsby-strapi\\content\\src\\pages\\index.js")))
}

