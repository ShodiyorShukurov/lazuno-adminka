import React, { useState } from 'react';
import {
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PartitionOutlined,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE } from '../../utils/constants';
const { Header, Sider, Content } = Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const Admin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Sider
        trigger={null}
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        className="bg-white"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          className="border-none"
          // defaultSelectedKeys={['1']}
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            localStorage.getItem(ROLE) === 'superadmin'
              ? {
                  key: '/admin',
                  icon: <UserOutlined />,
                  label: 'Admin List',
                }
              : null,
            {
              key: '/category',
              icon: <PartitionOutlined />,
              label: 'Categories',
            },
            {
              key: '/product',
              icon: <ProductOutlined />,
              label: 'Product',
            },
            {
              key: '/reviews',
              icon: <CommentOutlined />,
              label: 'Reviews',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
