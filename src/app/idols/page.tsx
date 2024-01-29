import Game from "@/components/game";
import { SearchProps } from "@/types";
import axios from "axios";
import { ObjectId } from "mongodb";
import { serverClient } from "@/trpc/server-client";
import { DataTable } from "@/components/table";
import { Card } from "@/components/ui/card";

export default async function Page()
{
  const idols: any[] = await serverClient.getIdolsData();

  return (
    <div className="w-full h-full p-12 flex flex-col gap-12 items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
        Idol List
      </h1>
      <Card className="bg-white rounded-md p-4">
        <DataTable data={idols}/>
      </Card>
    </div>
  )
}