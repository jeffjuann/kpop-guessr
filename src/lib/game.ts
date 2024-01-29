import { GuessProps, IdolProps } from "@/types";

export function checkMatch(guessIdol: IdolProps | any, searchIdol: IdolProps | any): GuessProps
{
	let isMatch: string[] = [];
	if(guessIdol.generation === searchIdol.generation)  	 isMatch.push('Generation');
	if(guessIdol.agency === searchIdol.agency) 	 	 isMatch.push('Agency');
	if(guessIdol.group === searchIdol.group) 			 isMatch.push('Group');
	if(getMonth(guessIdol.birth) === getMonth(searchIdol.birth)) isMatch.push('Birth');
	if(getAge(guessIdol.birth) === getAge(searchIdol.birth))	 isMatch.push('Age');
	if(guessIdol.nationality === searchIdol.nationality) 	 isMatch.push('Nationality');
	const result: GuessProps = {
		idol: guessIdol, 
		isMatch: isMatch
	}
	return result;
}

export function getMonth(dateString: string): string
{
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  return month.toUpperCase();
}

export function getAge(dateString: string): string
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