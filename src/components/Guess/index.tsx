import guessStyles from '@/styles/Guess.module.css';
import Card from './GuessCard';
import { GuessProps } from '@/types';



export default function Guess({ guesses }:{ guesses: GuessProps[]})
{
  return (
    <div className={`${guessStyles.container}`}>
      <h2>Your Guesses</h2>
      <div className={`${guessStyles.guessList}`}>
        { guesses.length !== 0 ? guesses.map((guessItem: GuessProps, index: number) =>
          {
            if(index === 0)
            {
              return (
                <Card guess={guessItem} animated key={index}/>
              )
            }
            else
            {
              return (
                <Card guess={guessItem} key={index} />
              )
            }
          } 
          ) : <h2 style={{fontWeight: 400}}>Make a Random Guess</h2>
        }
      </div>
    </div>
  )
}