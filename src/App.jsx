import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

function App() {
const [userPrompt,setUserPrompt] = useState("");
const [number,setNumber] = useState(1);
const [size,setSize] = useState("256x256");
const [imageUrl, setImageUrl] = useState("");

const generateImage = async () => {
  const imageParameters = {
    prompt: userPrompt,
    n: parseInt(number),
    size: size,
  }
try {
  const response = await openai.createImage(imageParameters);
  const urlData =response.data.data[0].url;
  setImageUrl(urlData);
} catch (error) {
  console.error("Error generating image:", error);
}
};

const handleSizeChange = (event) => {
  setSize(event.target.value);
};

 const handleNumberChange = (value) => {
  setNumber(parseInt(value, 10))
 }
 const sizes = ["256x256", "512x512", "1024x1024"];

  return (
    <div className='App'>
    <Navbar />
    <Main label={"Empieza a Crear"} setAttribute={setUserPrompt}/>
    <Main label={"Numero de Fotos"} setAttribute={setNumber}/>
    <div className="label-input-pair">
        <label className="label">Tamaño:</label>
        <select className="main-input" onChange={handleSizeChange}>
          <option value="256x256">256x256</option>
          <option value="512x512">512x512</option>
          <option value="1024x1024">1024x1024</option>
        </select>
      </div>
      <div className="image-container">
        {imageUrl && (
          <img src={imageUrl} className="image" alt="ai image" />
        )}
        </div>
      <SubmitButton onSubmit={generateImage} />
    </div>
    /* <Main label={"Tamaño"} setAttribute={setSize} options={sizes}/>
    <SubmitButton onClick={generateImage} /> */
  );
}

export default App
