import React, { useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tailwindcss/tailwind.css';

library.add(faCheck);

function SubmitButton({ onSubmit }) {
  const [showCheck, setShowCheck] = useState(false);
  const buttonRef = useRef();

  function handleClick() {
    anime({
      targets: buttonRef.current,
      scale: [
        { value: 1, duration: 0 },
        { value: 1.2, duration: 200 },
        { value: 1, duration: 200 }
      ],
      borderRadius: [
        { value: '50%', duration: 200, delay: 200 },
        { value: '0%', duration: 200 }
      ],
      complete: function () {
        setShowCheck(true);
        if (onSubmit) {
          onSubmit();
        }

        setTimeout(() => {
          setShowCheck(false);
        }, 2250);
      }
    });
  }

  return (
    <div className="absolute top-1/2 left-1/2 -mt-10 -ml-16 w-32 h-10 text-center">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="outline-none h-10 w-32 rounded-full bg-green-500 border-2 border-green-500 text-white tracking-wider text-shadow-none text-xs font-bold cursor-pointer transition-all duration-200 ease-in">
        {showCheck ? (
           <FontAwesomeIcon icon="check" className="check-icon" />
        ) : ( 
          "Generar"
        )}
      </button>
    </div>
  );
}

export default SubmitButton;
