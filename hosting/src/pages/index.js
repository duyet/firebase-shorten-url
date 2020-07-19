/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
import React from 'react';
import axios from 'axios';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, Spin } from 'antd';

import Layout from '../components/layout';
import SEO from '../components/seo';
import gtagTrack from '../utils/gtag';
import ShortenResult from '../components/shorten-result';

const { Search } = Input;

const ERROR_MESSAGE = 'Something went wrong!';

class IndexPage extends React.Component {
  state = {
    url: null,
    result: null,
    error: null,
    loading: false
  }

  onSubmit = (e) => {
    this.setState({ loading: true });
    const params = {
      idToken: null,
      url: this.state.url,
      email: null
    };
    axios.post('/api/add', params)
      .then((response) => {
        console.log(response);
        this.setState({ result: response.data, loading: false });
        gtagTrack('get-shorten', 'success', response.data.shortLink, response.data);
      })
      .catch((err) => {
        this.setState({ loading: false });

        console.error(err);
        if (err.response) {
          const data = err.response.data || {};
          gtagTrack('get-shorten', 'error', this.state.url, err.response);
          return alert(data.msg || ERROR_MESSAGE);
        }
        return alert(err.msg || ERROR_MESSAGE);
      });

    if (e) {
      e.preventDefault();
    }
  }

  onChangeInput = (e) => {
    this.setState({ url: e.target.value });
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />

        <Row style={{ margin: '5%' }}>
          <Col span={24}>
            <Form onSubmit={this.onSubmit}>
              <Search
                type='url'
                size='large'
                onChange={this.onChangeInput}
                loading={this.state.loading}
                onPressEnter={() => { this.onSubmit(); }}
                onPaste={(e) => {
                  const url = e.clipboardData.getData('Text');
                  this.setState({ url }, () => this.onSubmit());
                }}
                placeholder="Paste your URL here"
              />
            </Form>
          </Col>
        </Row>

        <Row style={{ textAlign: 'center' }}>
          <Col>
            {this.state.loading ? <Spin size="large" /> : null}
            <ShortenResult result={this.state.result} />
          </Col>
        </Row>

      </Layout>
    );
  }
}

export default IndexPage;
