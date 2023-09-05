'use client'
import React from 'react';
import { useState } from "react";
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal/Modal';
import Box from '@material-ui/core/Box/Box';



interface QuizData {
  question: string
  answer: string
  image: any
}

const style ={
  position : 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform : 'translate(-50%, -50%)',
  height: 400,
  width: 700,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 24,
  p: 4,
};


function QuizApi(): QuizData[] {
  const outputDataList: QuizData[] = [{
    question: "ほのお",
    answer: "みず",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  },
  {
    question: "くさ",
    answer: "ほのお",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  },
  {
    question: "みず",
    answer: "くさ",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
  },
];
return outputDataList;
}

export default function Buttons() {
    const QuizArray : QuizData[] = QuizApi();
    const [QuizIndex, setQuizIndex] = useState(0);

    const [CorrectCount, setCorrectCount] = useState(0);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [pokemonID, setPokemonID] = useState(0);
    const [pokemonType, setPokemonType] = useState("なし");
    const [pokemonImageUrl, setPokemonImageUrl] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png");
    const [pokemonDamage, setPokemonDamage] = useState("なし");

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
        
        let strongType = ":"

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
    }

    const AnswerClick = () => {
      let answer = QuizArray[QuizIndex].answer;
      
      if(answer == pokemonType){
        console.log("正解");
        const newCorrectCount = CorrectCount + 1;
        setCorrectCount((CorrectCount) => newCorrectCount);
        console.log(newCorrectCount);
      }      
      if(QuizIndex+1 === 3){
        setOpen(true)
        console.log("発火")
        return
      }
      setQuizIndex(QuizIndex+1)
    }

    return (
      <>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style} className='flex flex-col justify-center items-center'>
                <Typography className='text-center'>
                  <div>{CorrectCount}</div>
                </Typography>
            </Box>
        </Modal>

        <div className='flex flex-row'>
          <div className="flex flex-col">
              <img src={QuizArray[QuizIndex].image} className="border w-[300px] h-[300px]" />
              <p className="text-[50px]">タイプ : {QuizArray[QuizIndex].question}</p>
          </div>
          <div className='flex flex-col ml-[50px]'>
            <img src={pokemonImageUrl} className="border w-[300px] h-[300px]" />
            <div className="text-[50px]">タイプ : {pokemonType}</div>
          </div>
        </div>
        <button onClick={AnswerClick} className='w-[100px] h-[50px] bg-blue-500 hover:bg-blue-300 rounded font-bold text-white'>Answer</button>
        <div className="flex flex-row space-x-[30px] mt-[10px]">
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
  