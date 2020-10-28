import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
    'hashChangeStart',
    'hashChangeComplete'
]

function makeEvent(type) {
    return (...args) => {
        console.log(type, ...args)
    }
}

events.forEach(event => {
    Router.events.on(event, makeEvent(event))
})

export default () => {
  function goToTestB() {
      // Router.push('/test/b')
      Router.push({
          pathname: '/test/b',
          query: {
              id: 2
          }
      }, '/test/b/2')
  }

  return (
    <>
      <Link href="/test/a?id=1" as="/test/a/1">
        <Button>Index</Button>
      </Link>
      <Button onClick={goToTestB}>test b</Button>
    </>
  )
}
