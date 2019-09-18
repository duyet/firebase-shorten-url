/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
            textAlign: 'center'
          }}
        >
          <main>{children}</main>
          <footer
            style={{
              textAlign: 'center',
              borderTop: '1px solid #ddd',
              paddingTop: 15,
              marginTop: 15
            }}
          >
            © {new Date().getFullYear()}, Built with
            {' '}

            <a href="https://www.gatsbyjs.org">Gatsby</a>
            {', '}
            <a href="https://firebase.google.com">Firebase</a>
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
