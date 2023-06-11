import { Button, Input, InputNumber, Modal, Select, Space, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckSelectProgrammingLanguages = ({ onArrayChangePL }) => {
  const [options, setOptions] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedYears, setSelectedYears] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [arrLanguageExpreince, setArrLanguageExperience] = useState([]);
  const [isAddButton, setIsAddButton] = useState(false);
  const [anatherLanguage, setAnatherLanguage] = useState({
    name: "",
    year: 0,
  });

  useEffect(() => {
    const handleFileUpload = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7208/api/ReadAndWrite/1"
        );
        const newOptions = Object.keys(response.data).map((key) => ({
          label: key,
          value: key,
        }));
        setOptions(newOptions);
      } catch (error) {
        console.log(error);
      }
    };

    handleFileUpload();
  }, []);

  const AddLanguage = () => {
    setModalVisible(true);
    setIsAddButton(true);
    setSelectedLanguage(anatherLanguage.name);
  };
  const AddLanguageToExcel = async () => {
    try {
      const addLanguage = await axios.post(
        `https://localhost:7208/api/ReadAndWrite/${anatherLanguage.name}`
      );
      if (addLanguage.status === 200) {
        message.success("This Language added !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (value) => {
    console.log(value.length);
    setModalVisible(true);
    setSelectedLanguage(value[value.length - 1]);
    setDirty(true);
  };
  const handleModalOk = () => {
    if (isAddButton) {
      setAnatherLanguage({ ...anatherLanguage, year: selectedYears });
      AddLanguageToExcel();
    }
    setModalVisible(false);
    const exp = {
      programmingLanguage: selectedLanguage,
      numberOfYears: selectedYears,
    };
    const newArr = arrLanguageExpreince.filter(
      (le) => le.ProgrammingLanguage !== selectedLanguage
    );
    newArr.push(exp);
    setArrLanguageExperience(newArr);
    onArrayChangePL(newArr); // עדכון באבא
    setDirty(true);
    setIsAddButton(false);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const handleInputChange = (e) => {
    setSelectedYears(+e.target.value);
  };

  return (
    <div>
      <Space style={{ width: "100%" }} direction="vertical"></Space>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "50%" }}
        placeholder="Please select"
        onChange={handleChange}
        options={options.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
      />
      <Modal
        title={
          "Select the number of years of experience in language: " +
          selectedLanguage
        }
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <InputNumber
          min={0}
          max={50}
          style={{ padding: 24, width: 100 }}
          onChange={(e) => setSelectedYears(e)}
          value={selectedYears}
          onOk={handleInputChange}
        />
      </Modal>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <strong>Another Language</strong>
        <Input
          style={{ width: "50%" }}
          type="text"
          onChange={(e) =>
            setAnatherLanguage({ ...anatherLanguage, name: e.target.value })
          }
          value={anatherLanguage.name}
        />
      </div>
      <Button onClick={AddLanguage}>Add</Button>
    </div>
  );
};

export default CheckSelectProgrammingLanguages;
