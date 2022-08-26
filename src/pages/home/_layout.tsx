import {PieChartOutlined,} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState, useMemo } from 'react';
import { useSelector, history, IRouteComponentProps } from 'umi';

import './index.less';
import { MenuItemType } from './models/models';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}



const App: React.FC<IRouteComponentProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const menuArr = useSelector((state: any) => state.index.menuArr);

  const items: MenuItem[] = useMemo(() => {
    return menuArr.map((item: MenuItemType) =>
      getItem(
        item.title,
        item.key,
        <PieChartOutlined />,
        item.children &&
          item.children.map((val) => getItem(val.title, val.key)),
      ),
    );
  }, [menuArr]);

  const handleClick = (e: any) => {
    history.push(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
