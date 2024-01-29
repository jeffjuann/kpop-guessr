import { SearchProps } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[])
{
  return twMerge(clsx(inputs))
}

export const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const formatOptionItems = (items: SearchProps[]) => 
  items.map((idol) => ({ label: idol.name, value: idol._id?.toString()+'', group: idol.group }))