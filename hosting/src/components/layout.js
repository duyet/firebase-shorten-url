/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import {
  Layout as AntLayout, PageHeader, Typography, Tag
} from 'antd';
import 'antd/dist/antd.css';

import Footer from './footer';

const { Header, Content } = AntLayout;
const { Text } = Typography;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data) => (
      <AntLayout style={{ backgroundColor: '#FFF' }}>
        <Header style={{ height: 'auto' }}>
          <PageHeader
            title={<Text style={{ color: '#FFF' }}>{data.site.siteMetadata.title}</Text>}
            subTitle={<Text style={{ color: '#c7c5c5' }}>{data.site.siteMetadata.description}</Text>}
            tags={<Tag color="blue">beta</Tag>}
          />
        </Header>

        <Content>
          <div style={{ minHeight: 'calc(100vh - 400px)' }}>
            {children}
          </div>
        </Content>

        <Footer />

      </AntLayout>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
