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
        { value: 1.1, duration: 150 },
        { value: 1, duration: 150 }
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
    <div className="flex justify-center">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="relative inline-flex items-center mt-20 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      >
        <span className={`relative px-5 py-2.5 transition-all ease-in duration-75 ${showCheck ? "bg-opacity-0" : "bg-white dark:bg-gray-900"} rounded-md group-hover:bg-opacity-0`}>
          {showCheck ? (
            <FontAwesomeIcon icon="check" className="check-icon" />
          ) : (
            "Generar"
          )}
        </span>
      </button>
    </div>
  );
}

export default SubmitButton;








