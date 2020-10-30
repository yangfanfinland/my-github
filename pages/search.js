import { withRouter } from 'next/router'

function Search( { router } ) {
    return (
    <span>searching {router.query.query}</span>
    )
}

Search.getInitialProps = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({})
        }, 1000)
    })
}

export default withRouter(Search)