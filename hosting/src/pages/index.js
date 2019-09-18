/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const ERROR_MESSAGE = 'Something went wrong!';

const ShortenResult = (props) => {
  const [text, setText] = useState('Copy');

  if (!props.result) return null;
  return (
    <div
      style={{
        padding: 10,
        margin: 20
      }}
    >
      <a
        href={props.result.shortLink}
        target='_blank'
        rel="noopener noreferrer"
        style={{
          fontSize: 26,
        }}
      >
        {props.result.shortLink}
      </a>
      <CopyToClipboard
         text={props.result.shortLink}
         onCopy={() => {
           setText('Copied!');
         }}>
         <span style={{ margin: 10, padding: 10 }}>{text}</span>
      </CopyToClipboard>
    </div>
  );
};

class IndexPage extends React.Component {
  state = {
    url: null,
    result: null,
    error: null,
    loading: false
  }

  onSubmit = (e) => {
    const params = {
      idToken: null,
      url: this.state.url,
      email: null
    };
    axios.get('/api/add', { params })
      .then((response) => {
        console.log(response);
        this.setState({ result: response.data });
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          const data = err.response.data || {};
          return alert(data.msg || ERROR_MESSAGE);
        }
        return alert(err.msg || ERROR_MESSAGE);
      });

    e.preventDefault();
  }

  onChangeInput = (e) => {
    this.setState({ url: e.target.value });
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <p>Shorten URL by Firebase Dynamic Link</p>
        <form onSubmit={this.onSubmit}>
          <input type='text'
            onChange={this.onChangeInput}
            style={{
              width: '100%',
              padding: 5,
              border: '1px solid #ccc'
            }}
          />
        </form>
        <ShortenResult result={this.state.result} />
        <div style={{ maxWidth: '300px', marginBottom: '1.45rem', margin: '0 auto' }}>
          <Image />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
