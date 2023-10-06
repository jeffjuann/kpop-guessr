import { idolProps } from "@/types";
import { MongoClient, ServerApiVersion } from "mongodb";
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

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
{
	if (req.method === 'GET' && req.query.all === 'true')
	{
		return client.db("kpop-guessr").collection("idols").find().toArray()
		.then((list: any) =>
		{
			res.status(200).json(list);
		}).catch((err) =>
		{
			res.status(200).json(err);
		});	
	}
	if (req.method === 'GET')
	{
		return client.db("kpop-guessr").collection("idols").find().project({ name: 1, group: 1}).toArray()
		.then((list: any) =>
		{
			res.status(200).json(list);
		}).catch((err) =>
		{
			res.status(200).json(err);
		});
	}
	// if(req.method === 'POST')
	// {
	// 	// res.status(200).json(req.body);
	// 	return client.db("kpop-guessr").collection("idols").insertMany(req.body)
	// 	.then((list: any) =>
	// 	{
	// 		res.status(200).json(list);
	// 	}).catch((err) =>
	// 	{
	// 		res.status(200).json(err);
	// 	});
	// }
}

export default handler;