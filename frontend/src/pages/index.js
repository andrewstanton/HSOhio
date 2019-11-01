import React from "react"
import { graphql } from "gatsby"
import { darken } from "polished"

import styled from "styled-components"

import sports from "../images/sports.png"
import Layout from "../components/layouts/Layout"
import { Wrapper, Margin, Media, Color } from "../components/utilities"
import {
  ClinicLocator,
  StyledInnerBanner,
  InnerBannerOverlay,
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

const IndexBanner = styled(StyledInnerBanner)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${Media.below.desktop`
    grid-template-columns: 1fr;
  `}
`

const BackgroundHalf = styled.div`
  background-image: ${props => (props.image ? `url(${props.image})` : "none")};
  background-size: cover;
  background-position: center center;
  height: inherit;

  ${Media.below.desktop`
    height: 300px;
  `}
`
const LeftIndexBanner = styled.div`
  height: inherit;
  padding: 2.5rem;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: flex-end;

  ${Media.below.desktop`
    padding: 1rem;
    justify-content: center;
  `}
`
const LeftOverlay = styled(InnerBannerOverlay)`
  width: 400px;
  max-width: 90%;

  ${Media.below.desktop`
    width: auto;
  `}
`

const RightIndexBanner = styled.div`
  height: inherit;
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  color: ${Color.white};

  > div {
    width: 100%;
  }

  h1 {
    font-size: 2.75rem;
  }

  a {
    color: ${Color.white};
    font-size: 1.4rem;
    display: inline-block;
    padding-botttom: 0.25rem;
    border-bottom: 1px solid ${Color.white};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      border-bottom: 8px solid ${darken(0.3, Color.red)};
      color: ${darken(0.3, Color.red)};
    }
  }

  ${Media.below.desktop`

    h1 {
      font-size: 2rem;
    }
    a {
      font-size: 1rem;
    }
  `}
`

const IndexPageBanner = ({ promo = null }) => (
  <IndexBanner height="600px">
    <BackgroundHalf image={promo.featured_media.source_url}>
      <LeftIndexBanner>
        <LeftOverlay>
          <h1>
            $25 New Patient
            <br />
            Exam + X-Ray
          </h1>
          Schedule Your Appointment
          <br />
          Online Today!
        </LeftOverlay>
      </LeftIndexBanner>
    </BackgroundHalf>
    <BackgroundHalf image={sports}>
      <RightIndexBanner>
        <div>
          <h1>What CLE Does to Stay Fit</h1>
          <a href="http://clefitsurvey.com" target="_blank">
            Click Here to Take the Survey
          </a>
        </div>
      </RightIndexBanner>
    </BackgroundHalf>
  </IndexBanner>
  // <InnerBanner
  //   image={promo ? promo.featured_media.source_url : null}
  //   height="600px"
  //   bottomBanner={renderBanner}
  // >
  //   <h1>{promo.title}</h1>
  //   <div dangerouslySetInnerHTML={{ __html: promo.content }}></div>
  // </InnerBanner>
)

const IndexPage = ({ data }) => {
  const { allWordpressWpPromo, allWordpressPage, allWordpressWpLocation } = data
  const content = allWordpressPage.edges[0].node
  const promo = allWordpressWpPromo.edges[0].node
  const locations = allWordpressWpLocation.edges
  return (
    <Layout renderBanner={() => <IndexPageBanner promo={promo} />}>
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
    allWordpressWpPromo(sort: { fields: date, order: DESC }, limit: 1) {
      edges {
        node {
          title
          featured_media {
            source_url
          }
          content
        }
      }
    }
  }
`
