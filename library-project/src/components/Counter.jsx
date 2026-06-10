import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'

const Counter = () => {
  // Hook de estado -> modifica elemento de la interfaz de manera dinámica
  // [getter, setter] -> useState(estado inicial)
  const [count, setCount] = useState(0) ;

  const getPokeInfo = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/1";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h3>Contador</h3>
          <h1> { count } </h1>
        </div>
        <button 
          type='button' 
          onClick={ () => getPokeInfo() } 
        >
          Reinciar
        </button>
        <button 
          type='button' 
          className='counter' 
          onClick={ () => setCount( count - 1 ) }
        >
          Decrementar
        </button>
        <button
          type="button"
          className="counter"
          onClick={ () => setCount( count + 1 ) }
        >
          +
        </button>
      </section>
    </>
  )
}

export default Counter
