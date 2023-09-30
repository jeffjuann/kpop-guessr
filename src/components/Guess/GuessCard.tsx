import cardStyles from '@/styles/Guess/Card.module.css';
import { guessProps } from '@/types';

function Clue({ category, value, isMatch }: { category: string, value: string, isMatch: boolean})
{
  return (
    <div className={`${cardStyles.clueContainer}`}>
      <h4>{category}</h4>
      <div className={ isMatch ? `${cardStyles.clueMatch}` : `${cardStyles.clueUnmatch}`}>{value}</div>
    </div>
  )
}

export default function Card({ guess, animated = false }: { guess: guessProps, animated?: boolean})
{
  return (
    <div className={`${cardStyles.container}`}>
      <h3>{guess.idol.name}</h3>
      <div className={`${cardStyles.clueList}`}>
        <Clue category={"Generation"} value={guess.idol.generation} isMatch={guess.isMatch.includes("Generation")}/>
        <Clue category={"Agency"} value={guess.idol.agency} isMatch={guess.isMatch.includes("Agency")}/>
        <Clue category={"Group"} value={guess.idol.group} isMatch={guess.isMatch.includes("Group")}/>
        <Clue category={"Birth"} value={guess.idol.birth} isMatch={guess.isMatch.includes("Birth")}/>
        <Clue category={"Zodiac"} value={guess.idol.zodiac} isMatch={guess.isMatch.includes("Zodiac")}/>
        <Clue category={"Nationality"} value={guess.idol.nationality} isMatch={guess.isMatch.includes("Nationality")}/>
      </div>
    </div>
  )
}