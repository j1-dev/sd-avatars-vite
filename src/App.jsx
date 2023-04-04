import { useState } from 'react';

import Navbar from './components/Navbar';
import Main from './components/Main';
import SubmitButton from './components/SubmitButton';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '',
});

const openai = new OpenAIApi(configuration);

function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState('256x256');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = async () => {
    // ...other code
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleNumberChange = (value) => {
    setNumber(parseInt(value, 10));
  };

  const sizes = ['256x256', '512x512', '1024x1024'];

  return (
    <div className="App">
      <Navbar />
      <Main label={'Empieza a Crear'} setAttribute={setUserPrompt} />
      <Main label={'Numero de Fotos'} setAttribute={handleNumberChange} />
      <Main
        label="Tamaño"
        setAttribute={handleSizeChange}
        options={sizes}
      />
      <div className="image-container">
        {imageUrl && (
          <img src={imageUrl} className="image" alt="ai image" />
        )}
      </div>
      <SubmitButton onSubmit={generateImage} />
    </div>
  );
}

export default App;




