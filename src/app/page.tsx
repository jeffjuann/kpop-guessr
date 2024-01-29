import Game from "@/components/game";
import { SearchProps } from "@/types";
import { ObjectId } from "mongodb";
import { serverClient } from "@/trpc/server-client";
import { formatSearchProps } from "@/lib/utils";

export default async function Page()
{
  const idols: SearchProps[] = formatSearchProps(await serverClient.getIdols());
  const answerId: ObjectId = (await serverClient.getAnswerId())[0]._id; 

  return (
    <div className="w-full h-full p-12 flex flex-col gap-12 items-center justify-start">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
        K-POP Guessr
      </h1>
      <Game idols={idols.sort((a, b) => a.name.localeCompare(b.name))} answerId={answerId}/>
    </div>
  )
}