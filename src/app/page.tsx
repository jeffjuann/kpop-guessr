import Game from "@/components/game";
import { SearchProps } from "@/types";
import { ObjectId } from "mongodb";
import { serverClient } from "@/trpc/server-client";

export default async function Page()
{
  const idols: any[] = await serverClient.getIdols();
  const answerId: ObjectId = (await serverClient.getAnswerId())[0]._id; 

  console.log(idols);
  console.log(answerId);

  return (
    <div className="p-12 flex flex-col gap-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
        K-POP Guessr
      </h1>
      <Game idols={idols} answerId={answerId}/>
    </div>
  )
}