module.exports = {
  siteMetadata: {
    title: 'duyet shorten url',
    description: 'Shorten URL by Firebase Dynamic Link',
    author: '@duyetdev',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-92451506-6'],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
  proxy: {
    prefix: '/api',
    url: 'http://localhost:5000',
  },
};
