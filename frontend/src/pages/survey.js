import React from "react"
import { graphql } from "gatsby"

import styled from "styled-components"

import Layout from "../components/layouts/Layout"
import { Wrapper } from "../components/utilities"
import { InnerBanner } from "../components/elements"

const ContentSection = styled.div`
  padding: 4rem 0;
`

const IndexPageBanner = ({ image, title }) => (
  <InnerBanner image={image} height="500px">
    <h1>{title}</h1>
  </InnerBanner>
)

const SurveyPage = ({ data }) => {
  const { allWordpressPage } = data
  const node = allWordpressPage.edges[0].node
  const image = node.featured_media.source_url
  const title = node.title
  return (
    <Layout
      renderBanner={() => <IndexPageBanner image={image} title={title} />}
    >
      <Wrapper>
        <ContentSection>
          <div dangerouslySetInnerHTML={{ __html: node.content }}></div>
        </ContentSection>
      </Wrapper>
    </Layout>
  )
}

export default SurveyPage

export const SurveyQuery = graphql`
  {
    allWordpressPage(filter: { path: { eq: "/survey/" } }) {
      edges {
        node {
          title
          content
          featured_media {
            source_url
          }
        }
      }
    }
  }
`
