import React from 'react';
import 'tailwindcss/tailwind.css';

function Navbar() {
  return (
    <div className="bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg flex">
      <ul className="flex items-center text-center font-sans space-x-4 mx-auto">
        {/* Other list items */}

        <li className="relative group">
          <a
            href="#"
            className="text-black text-lg font-semibold py-2 px-4 relative transition-colors duration-300 ease-in-out group-hover:text-gray-500">
            Consejos
          </a>
          <div className="absolute -left-1 -top-1 h-px w-px bg-black transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-[-100%] group-hover:translate-y-[50%]"></div>
          <div className="absolute -right-1 -bottom-1 h-px w-px bg-black transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-[100%] group-hover:translate-y-[-50%]"></div>
        </li>
      </ul>
      <div className="animation start-home"></div>
    </div>
  );
}

export default Navbar;
