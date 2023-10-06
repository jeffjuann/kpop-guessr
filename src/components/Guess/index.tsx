import guessStyles from '@/styles/Guess/Guess.module.css';
import Card from './GuessCard';
import { guessProps } from '@/types';



export default function Guess({ guesses }:{ guesses: guessProps[]})
{
  return (
    <div className={`${guessStyles.container}`}>
      <h2>Your Guesses</h2>
      <div className={`${guessStyles.guessList}`}>
        { guesses.length !== 0 ? guesses.map((guessItem: guessProps, index: number) =>
          {
            if(index === 0)
            {
              return (
                <Card guess={guessItem} animated/>
              )
            }
            else
            {
              return (
                <Card guess={guessItem} />
              )
            }
          } 
          ) : <h2 style={{fontWeight: 400}}>Make a Random Guess</h2>
        }
      </div>
    </div>
  )
}