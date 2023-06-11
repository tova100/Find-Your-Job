import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Modal, InputNumber } from "antd";
import Highlighter from "react-highlight-words";

const ProgrammingLanguageSelect = ({
  experienceProgrammingLanguages,
  sendProLang,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [visible, setVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [editingLanguage, setEditingLanguage] = useState("");
  const [editYear, setEditYear] = useState("");
  const [Arr, SetArr] = useState(experienceProgrammingLanguages);
  const [prevlanguge, satPrevlanguge] = useState("");
  const operatingSystem = [
    "linux",
    "unix",
    "aix",
    "windows",
    "solaris",
    "androind",
  ];

  const [InOperatingSystem, SetInOperatingSystem] = useState(
    experienceProgrammingLanguages.filter((obj) =>
      operatingSystem.includes(obj.programmingLanguage)
    )
  );
  const [newB, SetnewB] = useState(
    experienceProgrammingLanguages.filter(
      (obj) => !operatingSystem.includes(obj.programmingLanguage)
    )
  );
  let data = [];
  const languagesInOperatingSystem = [];
  const languagesNotInOperatingSystem = [];

  experienceProgrammingLanguages.forEach((obj) => {
    if (operatingSystem.includes(obj.programmingLanguage)) {
      languagesInOperatingSystem.push(obj);
    } else {
      languagesNotInOperatingSystem.push(obj);
    }
  });
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleEdit = (language, year) => {
    setEditYear(year);
    setEditingLanguage(language);
    setVisible(true);
    satPrevlanguge(language);
  };

  const handleOk = () => {
    let newArr = Arr.map((obj) => {
      if (obj.programmingLanguage === prevlanguge) {
        return {
          numberOfYears: editYear,
          programmingLanguage: editingLanguage,
        };
      } else {
        return obj;
      }
    });
    // -----------------------
    let newA = languagesInOperatingSystem.map((obj) => {
      if (obj.programmingLanguage === prevlanguge) {
        return {
          numberOfYears: editYear,
          programmingLanguage: editingLanguage,
        };
      } else {
        return obj;
      }
    });
    //----------------------------
    let newB = languagesNotInOperatingSystem.map((obj) => {
      if (obj.programmingLanguage === prevlanguge) {
        return {
          numberOfYears: editYear,
          programmingLanguage: editingLanguage,
        };
      } else {
        return obj;
      }
    });
    sendProLang(newArr);
    SetArr(newArr);
    SetInOperatingSystem(newA);
    SetnewB(newB);
    setVisible(false);
    setEditingKey("");
    setEditYear("");
    setEditingLanguage("");
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingKey("");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "programmingLanguage",
      key: "nameLanguage",
      width: "30%",
      ...getColumnSearchProps("nameLanguage"),
    },
    {
      title: "Years of Experience",
      dataIndex: "numberOfYears",
      key: "numberOfYears",
      width: "20%",
      ...getColumnSearchProps("numberOfYears"),
    },
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: '20%',
    //   ...getColumnSearchProps('name'),
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() =>
            handleEdit(record.programmingLanguage, record.numberOfYears)
          }
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      {InOperatingSystem.length > 0 ? (
        <>
          <strong> Programing Languages In Operating System</strong>
          <Table
            columns={columns}
            dataSource={InOperatingSystem}
            pagination={false}
          />
        </>
      ) : (
        <span>No programing Languages In Operating System</span>
      )}
      <br />
      {newB.length > 0 ? (
        <>
          <strong> Programing Languages</strong>
          <Table columns={columns} dataSource={newB} pagination={false} />
        </>
      ) : (
        <span>No programing Languages</span>
      )}

      <Modal
        title="Edit Programming Language Experience"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Language"
          onChange={(e) => setEditingLanguage(e.target.value)}
          value={editingLanguage}
          name="nameLanguage"
        />
        <InputNumber
          placeholder="Years of Experience"
          name="numberOfYears"
          onChange={(e) => setEditYear(e)}
          value={editYear}
        />
      </Modal>
    </>
  );
};

export default ProgrammingLanguageSelect;
