import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import $ from 'jquery';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tailwindcss/tailwind.css';

library.add(faCheck);

function SubmitButton({ onSubmit }) {
  const [showCheck, setShowCheck] = useState(false);

  function handleClick() {
    $('#button').addClass('onclic');

    setTimeout(function () {
      $('#button').removeClass('onclic');
      $('#button').addClass('validate');
      setShowCheck(true);
      if (onSubmit) {
        onSubmit();
      }
    }, 2250);

    setTimeout(function () {
      $('#button').removeClass('validate');
      setShowCheck(false);
    }, 4500);
  }

  return (
    <div className="absolute top-1/2 left-1/2 -mt-10 -ml-16 w-32 h-10 text-center">
      <button
        id="button"
        onClick={handleClick}
        className="outline-none h-10 w-32 rounded-full bg-white border-2 border-green-500 text-green-500 tracking-wider text-shadow-none text-xs font-bold cursor-pointer transition-all duration-200 ease-in">
        {showCheck && <FontAwesomeIcon icon="check" className="check-icon" />}
      </button>
    </div>
  );
}

export default SubmitButton;
