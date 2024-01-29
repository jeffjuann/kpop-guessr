'use server';

import { serverClient } from "@/trpc/server-client";
import { ObjectId } from "mongodb";
import { GuessProps } from "@/types";

export const checkGuess = async (guessId: string, answerId: ObjectId) => 
{
	return await serverClient.checkGuess({ guessId: guessId, answerId: answerId.toString() });
};