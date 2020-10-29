import Link from 'next/link'
import styled from 'styled-components' 
import { withRouter } from 'next/router'

const Title = styled.h1 `
    color: yellow;
    font-size: 40px;
`


const A = ({ router, name }) => (
  <>
    <Title>This is title</Title>
    <Link href="#aaa">
      <a>
        A {router.query.id} {name}
      </a>
    </Link>
    <style jsx>{`
        a {
            color: blue
        }
    `}</style>
  </>
)

A.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'fan',
      })
    }, 1000)
  })
  return await promise
}

export default withRouter(A)
