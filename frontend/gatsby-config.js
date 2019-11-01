const { GA_TRACKING, GOOGLE_TAG_KEY, WP_API } = process.env

module.exports = {
  siteMetadata: {
    title: `HealthSource Chiropractic`,
    description: `HealthSource Is Committed To Supporting Our Community's Health & Wellness`,
    author: `@healthsource`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: WP_API,
        protocol: "https",
        hostingWPCOM: false,
        useACF: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GA_TRACKING,
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: GOOGLE_TAG_KEY,
        includeInDevelopment: true,
      },
    },
  ],
}
