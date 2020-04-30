import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  // Setting up our state hooks
  const [pokedex, setPokedex] = useState([]);
  const [wild, setWild] = useState({});

  // Called every time out state (pokedex) updates
  useEffect(() => {
    // When state updates, this will run...
    encounterWild();
  }, []); // the state items in [] update the useEffect runs

  const pokeID = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id;
  };

  const encounterWild = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID()).then((ret) => {
      //console.log(ret.data);
      setWild(ret.data);
    });
  };

  const catchPokemon = (pokemon) => {
    setPokedex((state) => {
      // pass the current state to maintain current items
      const exists = state.filter((p) => pokemon.id == p.id).length > 0;
      if (!exists) {
        state = [...state, pokemon];
        state.sort(function (a, b) {
          return a.id - b.id;
        });
      }
      return state;
    });
    encounterWild();
  };

  const releasePokemon = (id) => {
    setPokedex((state) => state.filter((p) => p.id != id));
  };

  return (
    <div className='app-wrapper'>
      <header>
        <h1 className='title'>React W/ Hooks</h1>
        <h3 className='subtitle'>Pokemon</h3>
      </header>
      <section className='wild-pokemon'>
        <h2>Wild Encounter</h2>
        <img
          className='sprite'
          src={
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
            wild.id +
            '.png'
          }
        />
        <h3>{wild.name}</h3>
        <button className='catch-btn' onClick={() => catchPokemon(wild)}>
          CATCH
        </button>
      </section>
      <section className='pokedex'>
        <h2>Pokedex</h2>
        <div className='pokedex-list'>
          {pokedex.map((pokemon) => (
            <div className='pokemon' key={pokemon.id}>
              <img
                className='sprite'
                src={
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                  pokemon.id +
                  '.png'
                }
              />
              <h3 className='pokemon-name'>{pokemon.name}</h3>
              <button
                className='remove'
                onClick={() => releasePokemon(pokemon.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
