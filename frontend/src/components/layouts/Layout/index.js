import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "../Header"
import Footer from "../Footer"

import { GlobalStyles } from "../../elements"
import { Color, SEO } from "../../utilities"

const Body = styled.div`
  background: ${Color.white};
  line-height: 200%;
  font-size: 18px;

  a {
    color: ${Color.red};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Layout = ({ renderBanner, promo, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          wordpressSiteMetadata {
            name
            description
          }
        }
      `}
      render={data => {
        const { wordpressSiteMetadata } = data
        // const promo = allWordpressWpPromo.edges[0].node
        return (
          <div>
            <GlobalStyles />
            <SEO
              title={wordpressSiteMetadata.name}
              description={wordpressSiteMetadata.description}
            />
            <Header siteMetadata={wordpressSiteMetadata} />
            {renderBanner && renderBanner()}
            <Body>{children}</Body>
            <Footer siteMetadata={wordpressSiteMetadata} />
          </div>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
