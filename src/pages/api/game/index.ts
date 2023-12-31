import { guessProps, idolProps } from "@/types";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri: string = process.env.NEXT_PUBLIC_DB_URI ?? '';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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

function checkMatch(guessIdol: idolProps, searchIdol: idolProps): guessProps
{
	let isMatch: string[] = [];
	if(guessIdol.generation  	 === searchIdol.generation)  	 isMatch.push('Generation');
	if(guessIdol.agency 	 	 === searchIdol.agency) 	 	 isMatch.push('Agency');
	if(guessIdol.group 		 	 === searchIdol.group) 			 isMatch.push('Group');
	if(getMonth(guessIdol.birth) === getMonth(searchIdol.birth)) isMatch.push('Birth');
	if(getAge(guessIdol.birth)	 === getAge(searchIdol.birth))	 isMatch.push('Age');
	if(guessIdol.nationality 	 === searchIdol.nationality) 	 isMatch.push('Nationality');
	const result: guessProps = {
		idol: searchIdol, 
		isMatch: isMatch
	}
	return result;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
{
	if (req.method === 'GET' && Object.keys(req.query).length === 0)
	{
		return client.db("kpop-guessr").collection("idols").aggregate([{ $sample: { size: 1 } }]).project({ _id: 1}).toArray()
		.then((list: any) =>
		{
			res.status(200).json(list);
		}).catch((err) =>
		{
			res.status(200).json(err);
		});
	}
	else if(req.method === 'GET' && 'guess_id' in req.query && 'search_id' in req.query)
	{
		const { guess_id, search_id } = req.query as { guess_id: string; search_id: string };
		const guessIdol: any =  await client.db("kpop-guessr").collection("idols").findOne({ _id: new ObjectId(guess_id)});
		const searchIdol: any =  await client.db("kpop-guessr").collection("idols").findOne({ _id: new ObjectId(search_id)});
		// res.status(200).json([guessIdol, searchIdol]);
		res.status(200).json(checkMatch(guessIdol, searchIdol));
	}
	else
	{
		res.status(200).json('Wrong API calls');
	}
}

export default handler;