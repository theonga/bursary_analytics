import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuFoldOutlined,
    PoweroffOutlined,
    BuildOutlined,
    MoneyCollectOutlined
  } from '@ant-design/icons';
import React from 'react';
import useData from '../../hooks/useData';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


export default function MainLayout({children}){
    const [collapsed, setCollapsed] = React.useState(false);
    const { adminData } = useData();

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(!collapsed)
      };

    return(
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<MenuFoldOutlined />}>
              Home
            </Menu.Item>
            <SubMenu key="sub1" icon={<MoneyCollectOutlined />} title="Scholarships">
              <Menu.Item key="5">All</Menu.Item>
              <Menu.Item key="6">Android</Menu.Item>
              <Menu.Item key="7">iOS</Menu.Item>
          </SubMenu>
            <SubMenu key="sub2" icon={<BuildOutlined />} title="Universities">
              <Menu.Item key="8">All</Menu.Item>
              <Menu.Item key="9">Android</Menu.Item>
              <Menu.Item key="10">iOS</Menu.Item>
          </SubMenu>
          <Menu.Item key="4"  icon={<PoweroffOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{adminData.user.email}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Bursary.io</Footer>
        </Layout>
      </Layout>
    )
}