import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import Input from 'antd/es/input/Input';
import { Form } from 'antd';

function CvDesplay(props) {
  return (
  
    <div>
      <label>Language:</label>
      <Input type="text" value={props.language} />
      <label>Number:</label>
      <Input  type="text" value={props.number} />
      <div>
        <label>Language</label>
        <Input type="text" value={props.language} />
      </div>
      <div>
      <label>Skills</label>
      <LanguageList languages={mylanguageArray} />
    </div>
    </div>
   
  );
}

const myArray = [
  {language:"English", number: 1},
  {language: "Spanish", number: 2},
  {language: "French", number: 3},
];
const mylanguageArray = [
    {languages:"English"},
    {languages: "Spanish"},
    {languages: "French"},
  ];
  function LanguageList(props) {
    const languageString = props.languages.map(language => language.languages).join(',');
    return <Input type="text" value={languageString} readOnly />;
  }
// Loop through array and create TextBox component for each element
const textBoxArray = myArray.map((item, index) => {
  return <CvDesplay key={index} language={item.language} number={item.number} />;
});
const textlanguageBoxArray = mylanguageArray.map((item, index) => {
    return <CvDesplay key={index} language={item.languages}/>;
  });
// Render the TextBox components to the DOM
ReactDOM.render(<div>{textBoxArray}</div>, document.getElementById('root'));

// textBoxArray();
export default CvDesplay;