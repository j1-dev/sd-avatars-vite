import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Main from './components/Main';
import SubmitButton from './components/SubmitButton';

// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

function App() {
  const engineId = 'stable-diffusion-512-v2-1';
  const apiHost = 'https://api.stability.ai';
  const apiKey = import.meta.env.VITE_SD_API_KEY;

  const [userPrompt, setUserPrompt] = useState('');
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState('256x256');
  const [image, setImage] = useState('');

  // Fetch call to get the list of available engines
  // useEffect(() => {
  //   const sub = async () => {
  //     const url = `${apiHost}/v1/engines/list`;

  //     if (!apiKey) throw new Error('Missing Stability API key.');

  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${apiKey}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Non-200 response: ${await response.text()}`);
  //     }

  //     const payload = await response.json();
  //     console.log(payload);
  //   };

  //   sub();
  // }, []);

  const generateImage = async () => {
    if (!apiKey) throw new Error('Missing Stability API key.');
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `${userPrompt}`,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 512,
          samples: 1,
          steps: 30,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }
    await response.json().then((response) => {
      setImage(response.artifacts[0].base64);
    });
    // responseJSON.artifacts.forEach((image, index) => {
    //   fs.writeFileSync(
    //     `./out/v1_txt2img_${index}.png`,
    //     Buffer.from(image.base64, 'base64')
    //   );
    // });
    console.log(response);
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
      <Main label="Tamaño" setAttribute={handleSizeChange} options={sizes} />
      <div className="image-container">
        {image && (
          <img
            src={`data:image/jpeg;base64,${image}`}
            className="image"
            alt="ai image"
          />
        )}
      </div>
      <SubmitButton onSubmit={generateImage} />
    </div>
  );
}

export default App;
