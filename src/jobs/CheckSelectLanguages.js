import { InputNumber, Modal, Select, Space, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckSelectLanguages = ({ onArrayChangeL }) => {
  const [options, setOptions] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [arrLanguage, setArrLanguage] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const handleFileUpload = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7208/api/ReadAndWrite/0"
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
  const handleChange = (value) => {
    setModalVisible(true);
    setSelectedLanguage(value[value.length - 1]);
    setDirty(true);
  };
  const handleModalOk = () => {
    setModalVisible(false);
    const languages = {
      spokenlanguage: selectedLanguage,
      levelOfKnowledge: selectedLevel,
    };
    const newLanguagesArr = arrLanguage.filter(
      (le) => le.spokenlanguage !== selectedLanguage
    );
    newLanguagesArr.push(languages);

    setArrLanguage(newLanguagesArr);
    onArrayChangeL(newLanguagesArr); // עדכון באבא
    setDirty(true);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const handleInputChange = (e) => {
    setSelectedLevel(+e.target.value);
  };
  return (
    <div>
      <Space style={{ width: "50%" }} direction="vertical"></Space>
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
        title={"Select the number of level of Language " + selectedLanguage}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <InputNumber
          min={1}
          max={5}
          style={{ padding: 24, width: 100 }}
          onChange={(e) => setSelectedLevel(e)}
          value={selectedLevel}
          onOk={handleInputChange}
        />
      </Modal>
    </div>
  );
};
export default CheckSelectLanguages;
