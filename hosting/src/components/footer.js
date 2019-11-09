import React from 'react';
import { Layout } from 'antd'

const { Footer } = Layout;

const FooterContaner = () => {
    return (
        <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            © {new Date().getFullYear()}, Built with
            {' '}

            <a href="https://www.gatsbyjs.org">Gatsby</a>
            {', '}
            <a href="https://firebase.google.com">Firebase</a>
        </Footer>
    )
}

export default FooterContaner;