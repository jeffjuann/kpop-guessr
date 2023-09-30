import { ObjectId } from "mongodb"

export type idolProps = 
{
    _id: ObjectId | null,
    name: string,
    group: string,
    birth: string,
    zodiac: string,
    agency: string,
    generation: string,
    nationality: string
}

export type guessProps =
{
    idol: idolProps,
    isMatch: string[],
}

export type searchProps =
{
    _id: ObjectId | null,
    name: string,
    group: string
}
