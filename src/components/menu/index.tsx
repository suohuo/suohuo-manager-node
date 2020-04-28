import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuList: React.FC = () => {
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
    const [openKeys, setOpenKeys] = useState(['sub1'])

    function onOpenChange (openKey) {
      const latestOpenKey = openKey.find(key => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(openKey)
      } else {
        console.log(latestOpenKey)
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
    }
    
    return (
      <>
        <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 191 }}
        >
        <SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>个人中心</span>
            </span>
          }
        >
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <AppstoreOutlined />
              <span>用户管理</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <SettingOutlined />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
      </>
    )
}

export default MenuList