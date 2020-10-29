import App from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'

import withRedux from '../lib/with-redux'

import 'antd/dist/antd.css'
import '../styles/globals.css'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { ...pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Layout>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    )
  }
}

export default withRedux(MyApp)
