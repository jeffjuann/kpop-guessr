import { ObjectId } from "mongodb"

export type IdolProps = 
{
    _id: ObjectId | string | null,
    name: string,
    group: string,
    birth: string,
    agency: string,
    generation: number,
    nationality: string
}

export type GuessProps =
{
    idol: IdolProps,
    isMatch: string[],
}

export type SearchProps =
{
    _id: string | ObjectId | null,
    name: string,
    group: string
}
