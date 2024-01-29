'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { filterOption, formatOptionItems } from "@/lib/utils";
import { GuessProps, IdolProps, SearchProps } from "@/types";
import { Select } from "antd";
import { ObjectId } from "mongodb";
import { useState } from "react";
import GuessItem from "./Guess/GuessCard";
import { trpc } from "@/trpc/client";

export default function Game({ idols, answerId }: { idols: SearchProps[], answerId: ObjectId})
{
  const [selectIsDisabled, setSelectIsDisabled] = useState<boolean>(false);
  const [guess, setGuess] = useState<GuessProps[]>([]);
  
  const onSelect = (value: string) => 
  {
    setSelectIsDisabled(true);
    // const res = trpc.checkGuess.useQuery({ guessId: value, answerId: answerId.toString() });
    setSelectIsDisabled(false);
  };

  return (
    <div className="flex flex-row gap-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Your Guess</CardTitle>
        </CardHeader>
        <CardContent>
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
          ) : <h2>Make a Random Guess</h2>
        }
        </CardContent>
      </Card>
      <Card className="p-4 h-fit w-64">
        <Select
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