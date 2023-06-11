import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  FormOutlined,
  AppstoreAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Spin } from "antd";
import { useSelector } from "react-redux";
import AddJob from "./AddJob";
import UserJobForm from "./ChangePersonalInformation";
import MyTable from "./show";
const { Header, Sider, Content } = Layout;

function JobMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(false);
  const data = "";
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isLouding, setIsLoading] = useState(false);
  const isRegister = useSelector((state) => state.user.isRegister);

  useEffect(() => {
    console.log(isRegister);
  }, [isRegister]);
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
      icon: <FormOutlined />,
      label: "My Jobs",
    },
    {
      key: "3",
      icon: <AppstoreAddOutlined />,
      label: "Add Job",
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
              disabled={isRegister && item.key == 2}
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
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {isLouding ? (
            <Spin tip="Loading">
              <div className="content" />
            </Spin>
          ) : (
            <>
              <div>
                {value === "1" && <UserJobForm />}
                {value === "3" && <AddJob />}
                {value === "2" && <MyTable />}
                <p>{data}</p>
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
export default JobMenu;
