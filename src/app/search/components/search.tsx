'use client'
import React from 'react';
import { useState } from "react";

export default function TypeSearch() {
    const [pokemonID, setPokemonID] = useState(0);

    const [pokemonType, setPokemonType] = useState("なし");

    const [pokemonImageUrl, setPokemonImageUrl] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png");

    const [pokemonDamage, setPokemonDamage] = useState("なし");

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    const fetchPokemon = async (num:number) =>{
        const res = await fetch("https://pokeapi.co/api/v2/type/"+num );
        const result = await res.json();
        return result;
    };

    const handleClick = async (num:number) => {
        const pokemon = await fetchPokemon(num);
        
        setPokemonID(pokemon['id']);
        setPokemonType(pokemon['names'][0]['name'])

        const damageDouble = pokemon['damage_relations']['double_damage_to']
        
        let strongType = ""

        for (const key in damageDouble){
            const pokemon2 = damageDouble[key]['url'];

            const fetchType = async () => {
                const res = await fetch(pokemon2);
                const result = await res.json();
                return result;
            }

            const typenames = await fetchType();
            const typename = typenames['names'][0]['name'];
            strongType += typename + " ";
        }
        setPokemonDamage(strongType);

        const pokemonLength = pokemon['pokemon'].length;
        
        const fetchPokemonImage = async () => {
            const index = Math.floor(Math.random()*pokemonLength + 1);
            const pokemonUrl = pokemon['pokemon'][index]['pokemon']['url']
            const res = await fetch(pokemonUrl);
            const result = await res.json();
            return result;
        };
        const image = await fetchPokemonImage();
        setPokemonImageUrl(image['sprites']['front_default'])
        console.log(pokemonID);
        console.log(pokemonType);
        console.log(pokemonDamage); 
    }

    return (
      <>
        <div className="flex flex-row">
            <img src={pokemonImageUrl} className="border w-[300px] h-[300px]" />
            <div className="ml-[30px]">
                <p className="text-[50px]">タイプ : {pokemonType}</p>
                <p className="text-[50px]">相性の良いタイプ : {pokemonDamage}</p>
            </div>
        </div>
        <div className="flex flex-row space-x-[30px] mt-[30px]">
          <button onClick={() => handleClick(10)} className="bg-orange-500 hover:bg-orange-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ほのお</button>
          <button onClick={() => handleClick(11)} className="bg-blue-400 hover:bg-blue-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">みず</button>
          <button onClick={() => handleClick(12)} className="bg-green-500 hover:bg-green-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">くさ</button>
          <button onClick={() => handleClick(1)} className="bg-gray-400 hover:bg-gray-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ノーマル</button>
          <button onClick={() => handleClick(2)} className="bg-red-500 hover:bg-red-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">かくとう</button>
          <button onClick={() => handleClick(3)} className="bg-sky-400 hover:bg-sky-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ひこう</button>
          <button onClick={() => handleClick(4)} className="bg-purple-500 hover:bg-purple-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">どく</button>
          <button onClick={() => handleClick(5)} className="bg-yellow-600 hover:bg-yellow-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">じめん</button>
          <button onClick={() => handleClick(6)} className="bg-yellow-500 hover:bg-yellow-200 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">いわ</button>
        </div>
        <div className="flex flex-row space-x-[30px]">
          <button onClick={() => handleClick(7)} className="bg-lime-500 hover:bg-lime-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">むし</button>
          <button onClick={() => handleClick(8)} className="bg-violet-800 hover:bg-violet-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ゴースト</button>
          <button onClick={() => handleClick(9)} className="bg-slate-400 hover:bg-slate-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">はがね</button>
          <button onClick={() => handleClick(13)} className="bg-amber-400 hover:bg-amber-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">でんき</button>
          <button onClick={() => handleClick(14)} className="bg-fuchsia-500 hover:bg-fuchsia-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">エスパー</button>
          <button onClick={() => handleClick(15)} className="bg-cyan-500 hover:bg-cyan-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">こおり</button>
          <button onClick={() => handleClick(16)} className="bg-blue-600 hover:bg-blue-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ドラゴン</button>
          <button onClick={() => handleClick(17)} className="bg-neutral-500 hover:bg-neutral-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">あく</button>
          <button onClick={() => handleClick(18)} className="bg-pink-500 hover:bg-pink-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">フェアリー</button>          
        </div>
      </>
    )
  }
