import React, {useState} from 'react'
import "./Navbar.css"


function Navbar() {
  return (
    <div className='Navbar'>
      <ul>
    <li>
        <a href='#'>Home</a>
    </li>
    <li>
        <a href='#'>Ejemplos</a>
    </li>
    <li>
        <a href='#'>Consejos</a>
    </li>
    </ul>
    <div className='animation start-home'></div>
  </div>
  )
}

export default Navbar;
