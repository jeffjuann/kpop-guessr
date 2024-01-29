import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    responseMeta(opts) {
      const { ctx, paths, errors, type } = opts;
      // assuming you have all your public routes with the keyword `public` in them
      const allPublic = paths && paths.every((path) => path.includes('public'));
      // checking that no procedures errored
      const allOk = errors.length === 0;
      // checking we're doing a query request
      const isQuery = type === 'query';
      if (allPublic && allOk && isQuery)
      {
        return {
          headers: {
            'cache-control': `s-maxage=1, stale-while-revalidate=1`,
          },
        };
      }
      return {};
    },
  });

export { handler as GET, handler as POST };