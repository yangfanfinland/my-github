import { useCallback, useState } from 'react'
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import Container from './Container'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/store'
import { withRouter } from 'next/router'
import Link from 'next/link'

const { Header, Content, Footer } = Layout

const footerStyle = {
  textAlign: 'center',
}

function MyLayout({ children, router }) {
  const urlQuery = router.query && router.query.query
  const [search, setSearch] = useState(urlQuery || '')
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const handleSearchChange = useCallback(
    (event) => {
      setSearch(event.target.value)
    },
    [setSearch]
  )

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`)
  }, [search])

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined />
              </Link>
            </div>
            <div className="search">
              <Input.Search
                value = {search}
                placeholder="search repository"
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="Click to login">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon={<UserOutlined />} />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Developed by Fan Yang @
        <a href="mailto:yangfanfinland@gmail.com">yangfanfinland@gmail.com</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .logo {
          color: white;
          font-size: 40px;
          display: flex;
          margin-right: 20px;
        }
        .search {
          display: flex;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  )
}

export default withRouter(MyLayout)
