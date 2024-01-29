import { z } from 'zod';
import { procedure, router } from './trpc';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { checkMatch } from '@/lib/game';
import { GuessProps } from '@/types';

const client = new MongoClient(process.env.NEXT_PUBLIC_DB_URI ?? '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const appRouter = router({
  getIdolsData: procedure
    .query(async () => {
      return await client.db("kpop-guessr").collection("idols").find().toArray();
    }),
  getIdols: procedure
    .query(async () => {
      return await client.db("kpop-guessr").collection("idols").find().project({ name: 1, group: 1}).toArray();
    }),
  getAnswerId: procedure
    .query(async () => {
      return await client.db("kpop-guessr").collection("idols").aggregate([{ $sample: { size: 1 } }]).project({ _id: 1}).toArray()
    }),
  checkGuess: procedure
    .input(z.object({ guessId: z.string(), answerId: z.string()}))
    .mutation(async ({ input }) => {
      const guessIdol = await client.db("kpop-guessr").collection("idols").findOne({ _id: new ObjectId(input.guessId)});
      const answerIdol = await client.db("kpop-guessr").collection("idols").findOne({ _id: new ObjectId(input.answerId)});
      if(guessIdol === null || answerIdol === null) return null;
      else return checkMatch(guessIdol, answerIdol);
    }),
});

export type AppRouter = typeof appRouter;