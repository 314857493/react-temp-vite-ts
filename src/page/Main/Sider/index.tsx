import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.less";
import { Menu } from "antd";
import mainRoutes from "@/Router/main/mainRoutes";
import { useSelector } from "react-redux";
import type { MyRoute, RouteWithChild } from "@/Router/types";
import type { RootState } from "@/store";

const Sider: React.FunctionComponent = () => {
  const auth = useSelector((state: RootState) => state.user.authority);
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [openKeys, setOpenKeys] = useState([location.pathname.split("/")[2]]);
  const handleOpenKeys = ({ key }: { key: string }) => {
    const _openKeys = [...openKeys];
    const index = _openKeys.findIndex((item) => {
      return item === key;
    });
    if (index > -1) {
      _openKeys.splice(index, 1);
    } else {
      _openKeys.push(key);
    }
    // console.log(_openKeys);
    setOpenKeys(_openKeys);
  };
  const filteMenu = (routes: MyRoute[]): React.ReactNode => {
    const menuRender = (menu: MyRoute) => {
      if ((menu as RouteWithChild).children) {
        return (
          <Menu.SubMenu
            key={menu.path}
            title={menu.title}
            onTitleClick={handleOpenKeys}
          >
            {filteMenu((menu as RouteWithChild).children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={menu.path}>
          <Link to={menu.path}>{menu.title}</Link>
        </Menu.Item>
      );
    };
    return routes.map((menu) => {
      if (menu.requireAuth) {
        if (auth.includes(menu.name)) {
          return menuRender(menu);
        } else {
          return null;
        }
      }
      return menuRender(menu);
    });
  };
  useEffect(() => {
    setSelected(location.pathname.split("/").slice(2).join("/"));
    if (!openKeys.includes(location.pathname.split("/")[2])) {
      handleOpenKeys({ key: location.pathname.split("/")[2] });
    }
  }, [location]);
  return (
    <div className={styles.main}>
      <Menu
        selectedKeys={[selected]}
        openKeys={openKeys}
        mode="inline"
        style={{ border: "none" }}
      >
        {filteMenu(mainRoutes)}
      </Menu>
    </div>
  );
};

export default Sider;
