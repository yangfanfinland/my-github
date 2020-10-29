import { useEffect  } from 'react'
import axios from 'axios'

import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import { add } from '../store/store'

const { publicRuntimeConfig } = getConfig()

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete',
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach((event) => {
  Router.events.on(event, makeEvent(event))
})

const Index = ({ counter, add }) => {
  function goToTestB() {
    // Router.push('/test/b')
    Router.push(
      {
        pathname: '/test/b',
        query: {
          id: 2,
        },
      },
      '/test/b/2'
    )
  }

  useEffect(() => {
    axios.get('/api/user/info').then(resp => console.log(resp))
  }, [])

  return (
    <>
      {/* <Link href="/test/a?id=1" as="/test/a/1">
        <Button>Index</Button>
      </Link>
      <Button onClick={goToTestB}>test b</Button> */}

      <span>Count: {counter}</span>
      <Button onClick={(e) => add(counter)}>Add</Button>
      <a href={publicRuntimeConfig.OAUTH_URL}>Login</a>
    </>
  )
}

Index.getInitialProps = async ({reduxStore}) => {
  reduxStore.dispatch(add(3))
  return {}
}


export default connect(function mapStateToProps(state) {
  return {
    counter: state.counter.count,
  }
}, function mapDispatchToProps(dispatch) {
  return {
    add: (num) => dispatch({ type: 'ADD', num })
  }
})(Index)
