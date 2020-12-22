import React from "react"
import { graphql } from "gatsby"

import styled from "styled-components"

import Layout from "../components/layouts/Layout"
import { Wrapper, Media } from "../components/utilities"
import { ClinicLocator } from "../components/elements"

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-column-gap: 2rem;
  padding: 4rem 0;

  ${Media.below.desktop`
    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
    grid-column-gap: 0;
  `}
`

const IndexPage = ({ data }) => {
  const content = data.allWordpressPage.edges[0].node
  const locations = data.allWordpressWpLocation.edges
  return (
    <Layout>
      <Wrapper>
        <ContentSection>
          <div>
            <h2 dangerouslySetInnerHTML={{ __html: content.title }}></h2>
            <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
          </div>
          <div>
            <ClinicLocator locations={locations} />
          </div>
        </ContentSection>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allWordpressPage(filter: { path: { eq: "/" } }) {
      edges {
        node {
          title
          content
        }
      }
    }
    allWordpressWpLocation {
      edges {
        node {
          title
          acf {
            latitude
            longitude
            address_one
            address_two
            city
            state
            zip
            phone
            link
          }
        }
      }
    }
  }
`
