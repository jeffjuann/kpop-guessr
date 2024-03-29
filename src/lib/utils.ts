import { IdolProps, SearchProps } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { Document, WithId } from "mongodb";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[])
{
  return twMerge(clsx(inputs))
}

export const filterOption = (input: string, option?: { label: string; value: string, group: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) || (option?.group ?? '').toLowerCase().includes(input.toLowerCase()) ;

export const formatOptionItems = (items: SearchProps[]) => 
  items.map((idol) => ({ label: idol.name, value: idol._id?.toString()+'', group: idol.group }))

export const formatSearchProps = (items: Document[]) =>
  items.map((idol) => ({ _id: idol._id.toString(), name: idol.name, group: idol.group })); 