import { withRouter } from 'next/router'
import Comp from '../../components/comp'

const A = ({ router, name }) => <Comp>A { router.query.id } {name}</Comp>

A.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'fan'
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(A)