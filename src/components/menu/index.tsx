import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import MENU_CONFIG from './const'

const { SubMenu } = Menu;

const MenuStyle: React.CSSProperties = {
  width: 191
}

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
        style={MenuStyle}
        >
         {
           MENU_CONFIG?.map((item, index) => {
              return (
                <SubMenu
                 key="sub1"
                 title={<span><MailOutlined /><span>{item.title}</span></span>}
                >
                  {
                    item.children?.map((item, index) => {
                       return (
                        <Menu.Item key={index}>{item.title}</Menu.Item>
                       )
                    })
                  }
                </SubMenu>
              )
           })
         }
       </Menu>
      </>
    )
}

export default MenuList