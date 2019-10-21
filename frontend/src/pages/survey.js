import React from "react"
import { graphql } from "gatsby"

import styled from "styled-components"

import Layout from "../components/layouts/Layout"
import { Wrapper, Media } from "../components/utilities"
import { InnerBanner } from "../components/elements"

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

const IndexPageBanner = ({ promo }) => (
  <InnerBanner image={promo.featured_media.source_url} height="500px">
    <h1>{promo.title}</h1>
  </InnerBanner>
)

const SurveyPage = ({ data }) => (
  <Layout renderBanner={({ promo }) => <IndexPageBanner promo={promo} />}>
    <Wrapper>
      <ContentSection>HELLO</ContentSection>
    </Wrapper>
  </Layout>
)

export default SurveyPage

export const SurveyQuery = graphql`
  {
    allWordpressPage(filter: { path: { eq: "/survey" } }) {
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
