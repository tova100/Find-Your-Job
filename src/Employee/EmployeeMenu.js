import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Spin } from "antd";
import { useSelector } from "react-redux";
import EditFromEmployee from "./ChangeDetailEmployee";
import StepsCv from "./StepsCv";
import ShowMyOptimalJob from "./ShowMyOptimalJob";
import ShowCV from "./ShowCV";
import { useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
function EmployeeMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const { dataCV } = location.state;

  const isRegister = useSelector((state) => state.employee.isRegister);
  useEffect(() => {}, [isRegister]);
  const handleClick = (key) => {
    setValue(key);
  };
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profil",
    },
    {
      key: "2",
      icon: <UploadOutlined />,
      label: "Uploud CV",
    },
    {
      key: "3",
      icon: <FormOutlined />,
      label: "My Jobs",
      // enabled:true,
    },
    {
      key: "4",
      icon: <FormOutlined />,
      label: "View resumes",
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[value]}
        >
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              // isRegister==הרשמה
              disabled={
                (isRegister && (item.key == 4 || item.key == 3)) ||
                (!isRegister && item.key == 2)
              }
              onClick={() => handleClick(item.key)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <from>
          <Content
            style={{ margin: "24px 16px 0", overflow: "initial" }}
          ></Content>
          {value === "1" && <EditFromEmployee />}
          {value === "4" && <ShowCV dataCV={dataCV} />}
          {value === "2" && <StepsCv />}
          {value === "3" && <ShowMyOptimalJob />}
        </from>
      </Layout>
    </Layout>
  );
}

export default EmployeeMenu;
