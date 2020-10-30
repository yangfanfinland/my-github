import { useEffect } from 'react'
import axios from 'axios'

const api = require('../lib/api')

function Index() {
    useEffect(() => {
    }, [])

    return (
        <span>Index</span>
    )
}

Index.getInitialProps = async ({ ctx }) => {
    const result =  await api.request({
        url: '/search/repositories?q=react',
    } ,ctx.req, ctx.res)

    return {
        data: result.data
    }
}

export default Index