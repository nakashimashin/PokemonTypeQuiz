'use client'
import React from 'react';
import { useState, useEffect} from "react";
import Modal from '@material-ui/core/Modal/Modal';
import Box from '@material-ui/core/Box/Box';
import Link from 'next/link';

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

export default function Buttons() {
    const [quizIndex, setQuizIndex] = useState(1);
    const [correctCount, setCorrectCount] = useState(0);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [typesList, setTypesList] = useState<string[]>([]);
    const [pokemonImageUrl, setPokemonImageUrl] = useState<string>(" ");
    const [pokemonNameA, setPokemonNameA] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState("");
    const [pokemonNameQ, setPokemonNameQ] = useState("");
    const [pokemonImage, setPokemonImage] = useState("");
    const [questionType, setQusetionType] = useState("");
    const [questionHalfType, setQuestionHalfType] = useState<string>("");


    useEffect(() => {
      QuestionSet();
    }, [quizIndex]);


    const fetchPokemon = async (num:number) =>{
        const res = await fetch("https://pokeapi.co/api/v2/type/"+num );
        const result = await res.json();
        return result;
    };

    const handleClick = async (num:number) => {
        const pokemon = await fetchPokemon(num);
        
        setTypesList([...typesList, pokemon['names'][0]['name'] + " "]);

        const pokemonLength = pokemon['pokemon'].length;
        
        const fetchPokemonInfo = async () => {
            const index = Math.floor(Math.random()*pokemonLength + 1);
            const pokemonUrl = pokemon['pokemon'][index]['pokemon']['url']
            const res = await fetch(pokemonUrl);
            const result = await res.json();
            return result;
        };
        const info = await fetchPokemonInfo();
        setPokemonImageUrl(info['sprites']['front_default']);

        const fetchPokemonName = async () => {
          const pokemonUrl = info['species']['url'];
          const res = await fetch(pokemonUrl);
          const result = await res.json();
          return result;
        };
        const name = await fetchPokemonName();
        setPokemonNameA(name['names'][0]['name']);
    }

    const AnswerClick = async () => {
      let items = "";
      const new_correctCount = correctCount + 1;
      for (const item of typesList){
        items += item;
      }
      const new_pokemonTypes = pokemonTypes + items;
      setPokemonTypes(() => new_pokemonTypes);

      if(questionHalfType === new_pokemonTypes){
        console.log("正解");
        setCorrectCount(() => new_correctCount);
        console.log(new_correctCount);
      }else{
        console.log("不正解");
      }
      setPokemonImageUrl("");
      setPokemonNameA("");
      setTypesList([]);
      setPokemonTypes("");

      if(quizIndex == 3){
        setOpen(true);
        return
      };
      const new_quizIndex = quizIndex+1;
      setQuizIndex(() => new_quizIndex);
    }

    const ResetClick = () => {
      setPokemonImageUrl("");
      setPokemonNameA("");
      setTypesList([]);
    }
    
    const QuestionSet = async () => {
      const index = Math.floor(Math.random()*18 + 1);
      const pokemon = await fetchPokemon(index);
      setQusetionType(pokemon['names'][0]['name']);

      const doubleDamageFrom = pokemon['damage_relations']['double_damage_from']
      let halfType = ""

      for (const key in doubleDamageFrom){
        const pokemon2 = doubleDamageFrom[key]['url'];

        const fetchType = async () => {
            const res = await fetch(pokemon2);
            const result = await res.json();
            return result;
        }

        const typenames = await fetchType();
        const typename = typenames['names'][0]['name'];
        halfType += typename + " ";
      }
      setQuestionHalfType(halfType);

      const pokemonLength = pokemon['pokemon'].length;
      const fetchPokemonInfo = async () => {
        const pokemonNum = Math.floor(Math.random()*pokemonLength + 1);
        const pokemonUrl = pokemon['pokemon'][pokemonNum]['pokemon']['url']
        const res = await fetch(pokemonUrl);
        const result = await res.json();
        return result;
      };
      const info = await fetchPokemonInfo();
      setPokemonImage(info['sprites']['front_default']);

      const fetchPokemonName = async () => {
        const pokemonUrl = info['species']['url'];
        const res = await fetch(pokemonUrl);
        const result = await res.json();
        return result;
      };
      const name = await fetchPokemonName();
      setPokemonNameQ(name['names'][0]['name']);
    }

    return (
      <>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
              <div className='flex flex-col items-center'>
                  <div className='mt-[60px] text-[50px] text-red-500'>正解数 {correctCount}</div>
                  <Link href="/" className='mt-[80px] w-[100px] h-[50px] bg-blue-500 hover:bg-blue-300 text-center text-[30px] text-white font-bold rounded'>TOP</Link>
              </div>
            </Box>
        </Modal>

        <div className='text-[50px]'>第{quizIndex}問</div>
        <div className='flex flex-row mt-[10px]'>
          <div className="flex flex-col">
              <img src={pokemonImage} className="border w-[300px] h-[300px]" />
              <div className="text-[30px]">名前 : {pokemonNameQ}</div>
              <div className="text-[30px]">タイプ : {questionType}</div>
              {/* <div className="text-[30px]">タイプ : {questionHalfType}</div> */}
          </div>
          <div className='flex flex-col ml-[50px]'>
            <img src={pokemonImageUrl} className="border w-[300px] h-[300px]" />
            <div className="text-[30px]">名前 : {pokemonNameA}</div>
            <div className="text-[30px]">タイプ : {typesList}</div>
          </div>
        </div>
        <div className='flex flex-row space-x-[30px] mt-[10px]'>
        <button onClick={AnswerClick} className='w-[100px] h-[50px] bg-blue-500 hover:bg-blue-300 rounded font-bold text-white'>答える</button>
        <button onClick={ResetClick} className='w-[100px] h-[50px] bg-blue-500 hover:bg-blue-300 rounded font-bold text-white'>リセット</button>
        </div>
        <div className="flex flex-row space-x-[30px]">
          <button onClick={() => handleClick(1)} className="bg-gray-400 hover:bg-gray-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ノーマル</button>
          <button onClick={() => handleClick(2)} className="bg-red-500 hover:bg-red-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">かくとう</button>
          <button onClick={() => handleClick(3)} className="bg-sky-400 hover:bg-sky-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ひこう</button>
          <button onClick={() => handleClick(4)} className="bg-purple-500 hover:bg-purple-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">どく</button>
          <button onClick={() => handleClick(5)} className="bg-yellow-600 hover:bg-yellow-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">じめん</button>
          <button onClick={() => handleClick(6)} className="bg-yellow-500 hover:bg-yellow-200 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">いわ</button>
          <button onClick={() => handleClick(7)} className="bg-lime-500 hover:bg-lime-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">むし</button>
          <button onClick={() => handleClick(8)} className="bg-violet-800 hover:bg-violet-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ゴースト</button>
          <button onClick={() => handleClick(9)} className="bg-slate-400 hover:bg-slate-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">はがね</button>
        </div>
        <div className="flex flex-row space-x-[30px]">
          <button onClick={() => handleClick(10)} className="bg-orange-500 hover:bg-orange-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">ほのお</button>
          <button onClick={() => handleClick(11)} className="bg-blue-400 hover:bg-blue-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">みず</button>
          <button onClick={() => handleClick(12)} className="bg-green-500 hover:bg-green-300 rounded w-[100px] h-[50px] mt-[30px] font-bold text-white">くさ</button>
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
  