import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "../Header"
import Footer from "../Footer"

import { GlobalStyles, InnerBanner } from "../../elements"
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

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          wordpressSiteMetadata {
            name
            description
          }
          allWordpressWpPromo(sort: { fields: date, order: DESC }, limit: 1) {
            edges {
              node {
                title
                featured_media {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 1500) {
                        src
                      }
                    }
                  }
                }
                content
              }
            }
          }
        }
      `}
      render={data => {
        const { allWordpressWpPromo, wordpressSiteMetadata } = data
        const promo = allWordpressWpPromo.edges[0].node
        return (
          <div>
            <GlobalStyles />
            <SEO
              title={wordpressSiteMetadata.name}
              description={wordpressSiteMetadata.description}
            />
            <Header siteMetadata={wordpressSiteMetadata} />
            <InnerBanner
              image={
                promo.featured_media.localFile
                  ? promo.featured_media.localFile.childImageSharp.fluid.src
                  : null
              }
            >
              <h1 dangerouslySetInnerHTML={{ __html: promo.title }}></h1>
              <div dangerouslySetInnerHTML={{ __html: promo.content }}></div>
            </InnerBanner>
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
