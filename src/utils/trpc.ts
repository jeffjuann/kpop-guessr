import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server';

function getBaseUrl()
{
  if (typeof window !== 'undefined') return '';
  else if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
}

export const trpc = createTRPCNext<AppRouter>(
{
  config(opts)
  {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});