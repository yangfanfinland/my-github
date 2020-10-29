import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { add } from '../store/store'

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

  return (
    <>
      {/* <Link href="/test/a?id=1" as="/test/a/1">
        <Button>Index</Button>
      </Link>
      <Button onClick={goToTestB}>test b</Button> */}

      <span>Count: {counter}</span>
      <Button onClick={(e) => add(counter)}>Add</Button>
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
