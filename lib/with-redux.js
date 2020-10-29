import React from 'react'
import createStore from '../store/store'

const isServer = typeof window === 'undefined'
const _NEXT_REDUX_STORE_ = '_NEXT_REDUX_STORE_'

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState)
  }

  if (!window[_NEXT_REDUX_STORE_]) {
    window[_NEXT_REDUX_STORE_] = createStore(initialState)
  }
  return window[_NEXT_REDUX_STORE_]
}

export default (Comp) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      const { Component, pageProps, ...rest } = this.props

      console.log(Component, pageProps)

      if (pageProps) {
        pageProps.test = '123'
      }

      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      )
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    const reduxStore = getOrCreateStore()

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    }
  }

  return WithReduxApp
}
