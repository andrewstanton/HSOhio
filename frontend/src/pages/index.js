import React from "react"
import { graphql, Link } from "gatsby"

import styled from "styled-components"

import Layout from "../components/layouts/Layout"
import { Wrapper, Margin, Media } from "../components/utilities"
import {
  ClinicLocator,
  InnerBanner,
  BottomBanner,
} from "../components/elements"

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

const StyledMargin = styled(Margin)`
  display: inline-block;
`

const renderBanner = () => (
  <BottomBanner>
    What Does CLE Love To Do To Stay Fit?{" "}
    <StyledMargin modifiers="ml2">
      <Link to="/survey">Click Here To Take The Survey?</Link>
    </StyledMargin>
  </BottomBanner>
)

const IndexPageBanner = ({ promo }) => (
  <InnerBanner
    image={promo.featured_media.source_url}
    height="600px"
    bottomBanner={renderBanner}
  >
    <h1>{promo.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: promo.content }}></div>
  </InnerBanner>
)

const IndexPage = ({ data }) => {
  const content = data.allWordpressPage.edges[0].node
  const locations = data.allWordpressWpLocation.edges
  return (
    <Layout renderBanner={({ promo }) => <IndexPageBanner promo={promo} />}>
      <Wrapper>
        <ContentSection>
          <div>
            <h2>{content.title}</h2>
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
