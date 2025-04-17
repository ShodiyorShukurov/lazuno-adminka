import React, { useState } from 'react';
import {
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PartitionOutlined,
  ProductOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Popconfirm } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE, API_TOKEN } from '../../utils/constants';
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

  const logOut = () => {
    localStorage.clear(API_TOKEN);
    localStorage.clear(ROLE);
    navigate('/login')
  };

  return (
    <Layout>
      <Sider
        trigger={
          <Popconfirm
           placement="topRight"
            title="Log Out"
            description="Do you want to leave the page?"
            onConfirm={logOut}
            okText="Yes"
            cancelText="No"
          >
            <div className="bg-white text-black flex justify-start items-center gap-3 pb-4 pl-4">
              <Avatar icon={<UserOutlined />} /> <b>superadmin </b>
              <LoginOutlined />
            </div>
          </Popconfirm>
        }
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        className="bg-white"
      >
        <div className="my-[20px] pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="17"
            viewBox="0 0 197 17"
            fill="none"
          >
            <path
              d="M13.4629 16H0.914286V0.685715H4.34286V12.9143H13.4629V16ZM18.3629 16.2286C15.8943 16.2286 14.4086 15.0857 14.4086 13.1657C14.4086 11.4743 15.6657 10.4229 18.1114 10.1714L23.0257 9.66857V9.23429C23.0257 7.74857 22.3629 7.33714 20.5343 7.33714C18.7971 7.33714 18.0886 7.79429 18.0886 9.09714V9.18857H14.6371V9.12C14.6371 6.28571 17.0143 4.32 20.7857 4.32C24.6029 4.32 26.4086 6.28571 26.4086 9.28V16H23.2086V13.3714H23.0257C22.5 15.1543 20.9 16.2286 18.3629 16.2286ZM17.86 12.9371C17.86 13.5543 18.34 13.8057 19.3457 13.8057C21.6771 13.8057 22.9343 13.2571 23.0257 11.6343L19.0486 12.0914C18.2257 12.16 17.86 12.3886 17.86 12.9371ZM39.8264 16H27.6664V13.0743L32.5807 9.16571L34.9807 7.65714V7.42857L32.5807 7.56571H28.0093V4.54857H39.4836V7.49714L34.1807 11.5886L32.0093 12.9371V13.1657L34.1807 13.0057H39.8264V16ZM45.9136 16.2286C42.6907 16.2286 41.1593 14.24 41.1593 11.68V4.54857H44.5879V10.5371C44.5879 12.3886 45.365 13.1657 47.5364 13.1657C49.7764 13.1657 50.5764 12.2971 50.5764 10.3543V4.54857H54.005V16H50.805V12.5029H50.6221C50.325 14.4229 48.9307 16.2286 45.9136 16.2286ZM59.1866 16H55.758V4.54857H58.9352V8.06857H59.1409C59.438 6.14857 60.8095 4.32 63.8037 4.32C66.9352 4.32 68.4209 6.33143 68.4209 8.86857V16H64.9923V10.0114C64.9923 8.18286 64.238 7.40571 62.1352 7.40571C59.9637 7.40571 59.1866 8.27429 59.1866 10.2171V16ZM76.2582 16.2286C72.3496 16.2286 69.7211 13.8971 69.7211 10.2857C69.7211 6.62857 72.3496 4.32 76.2582 4.32C80.1668 4.32 82.7954 6.62857 82.7954 10.2857C82.7954 13.8971 80.1668 16.2286 76.2582 16.2286ZM76.2582 13.1886C78.5668 13.1886 79.3896 12.2971 79.3896 10.2857C79.3896 8.27429 78.5668 7.33714 76.2582 7.33714C73.9268 7.33714 73.1268 8.27429 73.1268 10.2857C73.1268 12.2971 73.9268 13.1886 76.2582 13.1886ZM91.1509 16H87.7223V0.685715H100.682V3.77143H91.1509V7.22286H100.339V10.2857H91.1509V16ZM106.873 16.2286C103.651 16.2286 102.119 14.24 102.119 11.68V4.54857H105.548V10.5371C105.548 12.3886 106.325 13.1657 108.496 13.1657C110.736 13.1657 111.536 12.2971 111.536 10.3543V4.54857H114.965V16H111.765V12.5029H111.582C111.285 14.4229 109.891 16.2286 106.873 16.2286ZM120.146 16H116.718V4.54857H119.895V7.58857H120.101C120.421 5.73714 121.632 4.32 123.941 4.32C126.501 4.32 127.552 6.08 127.552 8.32V10.2171H124.124V9.02857C124.124 7.77143 123.621 7.22286 122.226 7.22286C120.695 7.22286 120.146 7.93143 120.146 9.37143V16ZM132.222 16H128.794V4.54857H131.971V8.06857H132.177C132.474 6.14857 133.845 4.32 136.839 4.32C139.971 4.32 141.457 6.33143 141.457 8.86857V16H138.028V10.0114C138.028 8.18286 137.274 7.40571 135.171 7.40571C132.999 7.40571 132.222 8.27429 132.222 10.2171V16ZM146.62 3.38286H143.191V0.685715H146.62V3.38286ZM146.62 16H143.191V4.54857H146.62V16ZM156.483 16H153.649C150.974 16 149.351 14.7429 149.351 11.8629V7.38286H147.546V4.54857H149.351V2.33143H152.78V4.54857H156.483V7.38286H152.78V11.4743C152.78 12.6171 153.214 12.9143 154.426 12.9143H156.483V16ZM162.498 16.2286C159.276 16.2286 157.744 14.24 157.744 11.68V4.54857H161.173V10.5371C161.173 12.3886 161.95 13.1657 164.121 13.1657C166.361 13.1657 167.161 12.2971 167.161 10.3543V4.54857H170.59V16H167.39V12.5029H167.207C166.91 14.4229 165.516 16.2286 162.498 16.2286ZM175.771 16H172.343V4.54857H175.52V7.58857H175.726C176.046 5.73714 177.257 4.32 179.566 4.32C182.126 4.32 183.177 6.08 183.177 8.32V10.2171H179.749V9.02857C179.749 7.77143 179.246 7.22286 177.851 7.22286C176.32 7.22286 175.771 7.93143 175.771 9.37143V16ZM190.499 16.2286C186.682 16.2286 184.076 14.3543 184.076 10.2857C184.076 6.62857 186.659 4.32 190.43 4.32C194.179 4.32 196.67 6.28571 196.67 9.87429C196.67 10.2857 196.624 10.5829 196.579 10.9714H187.253C187.344 12.7314 188.167 13.4857 190.384 13.4857C192.419 13.4857 193.127 12.96 193.127 11.9771V11.7486H196.556V12C196.556 14.4914 194.133 16.2286 190.499 16.2286ZM190.362 6.99429C188.327 6.99429 187.459 7.68 187.299 9.16571H193.379C193.287 7.65714 192.373 6.99429 190.362 6.99429Z"
              fill="black"
            />
          </svg>
        </div>
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
