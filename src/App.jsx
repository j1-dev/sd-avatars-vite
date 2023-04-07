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
  //const engineId = 'stable-diffusion-512-v2-1';
  const apiHost = 'https://api.stability.ai';
  const apiKey = import.meta.env.VITE_SD_API_KEY;

  const [userPrompt, setUserPrompt] = useState('');
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState([512, 512]);
  const [image, setImage] = useState('');
  const [option, setOption] = useState(false);
  const [initImg, setInitImg] = useState(null);

  const getEngineId = (width, height) => {
    if (width === 512 && height === 512) {
      return 'stable-diffusion-512-v2-1';
    } else if (width === 768 && height === 768) {
      return 'stable-diffusion-768-v2-1';
    } else if (width === 1024 && height === 1024) {
      return 'stable-diffusion-1024-v2-1';
    } else {
      throw new Error('Invalid size');
    }
  };

  // Converting size String to an array of two elements (width and height , declared in line 59)
  // const sizeStringToArray = (sizeString) => {
  //   const sizeArray = sizeString.split('x').map(Number);
  //   return sizeArray;
  // };

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

  const generateText2Image = async () => {
    // const [width, height] = size;
    const w = size[0];
    const h = size[1];
    // const engineId = getEngineId(width, height);
    const engineId = 'stable-diffusion-512-v2-1';

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
          sampler: 'K_HEUN',
          height: h,
          width: w,
          samples: 1,
          steps: 40,
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

  const generateImage2Image = async () => {
    // const [width, height] = size;
    const w = size[0];
    const h = size[1];
    // const engineId = getEngineId(width, height);
    const engineId = 'stable-diffusion-512-v2-1';

    if (!apiKey) throw new Error('Missing Stability API key.');
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
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
          init_image: initImg,
          init_image_mode: 'IMAGE_STRENGTH',
          cfg_scale: 7,
          sampler: 'K_HEUN',
          height: h,
          width: w,
          samples: 1,
          steps: 40,
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
    setSize(event.split('x').map(Number));
    // setSize(event.target.value.split('x').map(Number));
  };

  const handleNumberChange = (value) => {
    setNumber(parseInt(value, 10));
  };

  const sizes = ['512x512', '768x768', '1024x1024'];

  return (
    <div className="App">
      <Navbar />
      <div className="content flex justify-center">
        <div className="image-container">
          {image && (
            <img
              src={`data:image/jpeg;base64,${image}`}
              className="image"
              alt="ai image"
            />
          )}
        </div>
      </div>
      <Main label={'Empieza a Crear'} setAttribute={setUserPrompt} />
      <Main label={'Numero de Fotos'} setAttribute={handleNumberChange} />
      <Main
        label="Tamaño"
        setAttribute={handleSizeChange}
        options={sizes}
        value={`${size[0]}x${size[1]}`}
      />
      {option && {}}

      <SubmitButton onSubmit={generateText2Image} />
    </div>
  );
}

export default App;
