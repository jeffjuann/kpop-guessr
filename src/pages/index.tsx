
// COMPONENTS
import Head from 'next/head'
import Guesses from '@/components/Guess';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import axios from 'axios';

// TYPES
import { guessProps, searchProps } from '@/types';
import { ObjectId } from 'mongodb';

// STYLES
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import gameStyles from '@/styles/Game.module.css';

const inter = Inter({ subsets: ['latin'] })

const URL: string = process.env.BASE_URL ?? '';

async function checkSearch(guess_id: ObjectId, search_id: ObjectId): Promise<guessProps>
{
  const res = await axios.get(`${URL}/api/game?guess_id=${guess_id}&search_id=${search_id}`)
  .then((response) =>
  {
    return response.data;
  })
  return res; 
}

function refreshPage()
{
  window.location.reload();
}


function win()
{
  alert("Congratulations, You Win!!!");
}

export default function Home({ idols, guess_id}: { idols: searchProps[], guess_id: ObjectId})
{
  const [ initial, setInitial ] = useState<boolean>(true);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ guesses, setGuesses ] = useState<guessProps[]>([]);

  useEffect(() => {
    if(initial === true)
    {
      setInitial(false);
    }
    else
    {
      if(guesses[0].isMatch.length === 6)
      {
        alert("You Win, Play Again?");
        refreshPage();
      }
    }
  }, [guesses]);

  async function handleSubmit(search_id: ObjectId)
  {
    if( guess_id !== null && search_id !== null)
    {
      const newGuess = await checkSearch(guess_id, search_id);
      setGuesses([ newGuess, ...guesses])
    }
  }
  
  return (
    <>
      <Head>
        <title>kpop - guessr</title>
        <meta name="description" content="a KPOP Game inspired by playfootball.games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`${styles.main} ${inter.className}`}>
        <h1>{"KPOP-GUESSR"}</h1>
        {/* <h1>{URL}</h1> */}
        <div className={`${gameStyles.container}`}>
          <Guesses guesses={guesses}/>
          <Input idols={idols} onSubmit={handleSubmit}/>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any)
{
  const idols = await axios.get(`${URL}/api/idols`)
  .then((response) =>
  {
    return (response.data)
  }).catch((err) =>
  {
    console.log(err);
    return {
      props: {
        error: '[ERR]: Failed Fetching Idols',
      }
    }
  });

  const guess_id = await axios.get(`${URL}/api/game`)
  .then((response) =>
  {
    return (response.data[0]._id);
  }).catch((err) =>
  {
    console.log(err);
    return {
      props: {
        error: '[ERR]: Failed Fetching Guess ID',
      }
    }
  })

  return {
    props: {
      idols: idols,
      guess_id: guess_id,
    }
  } 
}