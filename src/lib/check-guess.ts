'use server';

import { serverClient } from "@/trpc/server-client";
import { ObjectId } from "mongodb";
import { GuessProps } from "@/types";
import { revalidatePath } from "next/cache";

export const checkGuess = async (guessId: string, answerId: ObjectId) => 
{
	return await serverClient.checkGuess({ guessId: guessId, answerId: answerId.toString() });
};

export const revalidatePage = async () =>
{
	revalidatePath('/','layout');
	revalidatePath('/','page');
}