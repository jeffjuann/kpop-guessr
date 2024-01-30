'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { filterOption, formatOptionItems } from "@/lib/utils";
import { GuessProps, SearchProps } from "@/types";
import { Select } from "antd";
import { ObjectId } from "mongodb";
import { useState } from "react";
import GuessItem from "./guess-card";
import { checkGuess, revalidatePage } from "@/lib/check-guess";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function Game({ idols, answerId }: { idols: SearchProps[], answerId: ObjectId})
{
  const router = useRouter();
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectIsDisabled, setSelectIsDisabled] = useState<boolean>(false);
  const [guess, setGuess] = useState<GuessProps[]>([]);

  const onSelect = async (value: string) => 
  {
    setSelectValue(value);
    setSelectIsDisabled(true);
    const res = await checkGuess(value, answerId);
    console.log(res);
    if(res === null) return;
    setGuess((guess: GuessProps[]) => [res, ...guess]);
    if(res.idol._id && res.idol._id.toString() === answerId.toString())
    {
      await revalidatePage();
      alert("You Win!");
    } 
    else 
    {
      setSelectIsDisabled(false);
      setSelectValue(null);
    }
  };

  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:justify-center">
      <Card className=" w-full md:w-[400px]">
        <CardHeader>
          <CardTitle className="text-center scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Your Guess</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
        { guess.length !== 0 ? guess.map((guessItem: GuessProps, index: number) =>
          {
            if(index === 0)
            {
              return (
                <GuessItem guess={guessItem} animated key={index}/>
              )
            }
            else
            {
              return (
                <GuessItem guess={guessItem} key={index} />
              )
            }
          } 
          ) : <h2 className="scroll-m-20 text-2xl font-light italic tracking-tight text-center">Start Guessing</h2>
        }
        </CardContent>
      </Card>
      <Card className="p-4 h-fit w-full md:w-64">
        <Select
          value={selectValue}
          disabled={selectIsDisabled}
          className="w-full"
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onSelect}
          filterOption={filterOption}
          options={formatOptionItems(idols)}
          optionRender={(option) => (
            <div className="flex flex-col p-1">
              <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                {option.data.label}
              </span>
              <span>
                {option.data.group}
              </span>
            </div>
          )}
        />
      </Card>
    </div>
  )
}