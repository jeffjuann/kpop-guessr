import { getAge, getMonth } from '@/lib/game';
import { GuessProps } from '@/types';
import ClueItem from './clue-item';

export default function GuessItem({ guess, animated = false }: { guess: GuessProps, animated?: boolean})
{
  return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className='font-semibold text-xl'>{guess.idol.name}</h3>
      <div className="flex flex-row gap-1">
        <ClueItem category="GEN" value={guess.idol.generation} isMatch={guess.isMatch.includes("Generation")}/>
        <ClueItem category="AGN" value={guess.idol.agency} isMatch={guess.isMatch.includes("Agency")}/>
        <ClueItem category="GRP" value={guess.idol.group} isMatch={guess.isMatch.includes("Group")}/>
        <ClueItem category="BIR" value={getMonth(guess.idol.birth)} isMatch={guess.isMatch.includes("Birth")}/>
        <ClueItem category="AGE" value={getAge(guess.idol.birth)} isMatch={guess.isMatch.includes("Age")}/>
        <ClueItem category="NAT" value={guess.idol.nationality} isMatch={guess.isMatch.includes("Nationality")}/>
      </div>
    </div>
  )
}