import cardStyles from '@/styles/Guess/Card.module.css';
import { guessProps } from '@/types';
import { Textfit } from 'react-textfit';

function Clue({ category, value, isMatch }: { category: string, value: string | number, isMatch: boolean})
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
  const age = getAge(guess.idol.birth);

  const birthMonth = getMonth(guess.idol.birth);

  return (
    <div className={`${cardStyles.container}`}>
      <h3>{guess.idol.name}</h3>
      <div className={`${cardStyles.clueList}`}>
        <Clue category={"GEN"} value={guess.idol.generation} isMatch={guess.isMatch.includes("Generation")}/>
        <Clue category={"AGN"} value={guess.idol.agency} isMatch={guess.isMatch.includes("Agency")}/>
        <Clue category={"GRP"} value={guess.idol.group} isMatch={guess.isMatch.includes("Group")}/>
        <Clue category={"BIR"} value={birthMonth} isMatch={guess.isMatch.includes("Birth")}/>
        <Clue category={"AGE"} value={age} isMatch={guess.isMatch.includes("Age")}/>
        <Clue category={"NAT"} value={guess.idol.nationality} isMatch={guess.isMatch.includes("Nationality")}/>
      </div>
    </div>
  )
}

function getMonth(dateString: string): string
{
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  return month.toUpperCase();
}

function getAge(dateString: string): string
{
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age.toString();
}