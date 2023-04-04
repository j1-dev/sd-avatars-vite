import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function Main({ label, setAttribute, options }) {
  const handleChange = (event) => {
    setAttribute(event.target.value);
  };

  return (
    <div className="mt-12 pl-12 flex justify-center space-x-8 items-center w-7/10 h-full">
      <label className="text-lg font-bold mb-1 mr-7">{label}:</label>
      {options ? (
        <select
          className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-sm appearance-none pr-6 bg-no-repeat bg-right-2 bg-center"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E')",
            backgroundSize: '8px',
          }}
          onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-sm"
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default Main;
