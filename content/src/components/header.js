import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div className="header">
    <div className="container">
      <h1>
        <Link to="/">
          FOGLIGHT
        </Link>
      </h1>
      <ul className="header-link">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/event">Evenements</Link></li>
        <li><Link to="/admin">Admin panel</Link></li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
