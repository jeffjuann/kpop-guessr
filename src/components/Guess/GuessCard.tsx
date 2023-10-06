import cardStyles from '@/styles/Guess/Card.module.css';
import { guessProps } from '@/types';
import { Textfit } from 'react-textfit';

function Clue({ category, value, isMatch }: { category: string, value: string, isMatch: boolean})
{
  return (
    <div className={`${cardStyles.clueContainer}`}>
      <Textfit mode="single" style={{ maxWidth: 52, fontWeight: 'bold'}}>{category}</Textfit>
      <div className={`${cardStyles.clue}`} style={{ backgroundColor: ( isMatch ? '#22C55E' : '#94A3B8')}}>
        <Textfit mode="single" style={{ maxWidth: 40}} max={12}>
          {value}
        </Textfit>
      </div>
    </div>
  )
}

export default function Card({ guess, animated = false }: { guess: guessProps, animated?: boolean})
{
  return (
    <div className={`${cardStyles.container}`}>
      <h3>{guess.idol.name}</h3>
      <div className={`${cardStyles.clueList}`}>
        <Clue category={"GEN"} value={guess.idol.generation} isMatch={guess.isMatch.includes("Generation")}/>
        <Clue category={"AGN"} value={guess.idol.agency} isMatch={guess.isMatch.includes("Agency")}/>
        <Clue category={"GRP"} value={guess.idol.group} isMatch={guess.isMatch.includes("Group")}/>
        <Clue category={"BIR"} value={guess.idol.birth} isMatch={guess.isMatch.includes("Birth")}/>
        <Clue category={"AGE"} value={guess.idol.zodiac} isMatch={guess.isMatch.includes("Zodiac")}/>
        <Clue category={"NAT"} value={guess.idol.nationality} isMatch={guess.isMatch.includes("Nationality")}/>
      </div>
    </div>
  )
}