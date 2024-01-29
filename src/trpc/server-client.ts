import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_URL}api/trpc`,
      headers: {
        'cache-control': `no-cache, no-store, must-revalidate`,
      },   
    }),
  ],
});