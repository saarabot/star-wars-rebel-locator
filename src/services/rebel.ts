import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SecretResponse } from '@/types';

export const rebelApi = createApi({
  reducerPath: 'rebelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://',
  }),
  endpoints: (builder) => ({
    getRebels: builder.query<SecretResponse, void>({
      query: () => `aseevia.github.io/star-wars-frontend/data/secret.json`,
    }),
    /*
    // Could not get this to work :( 
    getRebelById: builder.query<RebelInfo[], Rebel[]>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const promises = _arg.map((rebel) =>
          fetchWithBQ(`akabab.github.io/starwars-api/api/id/${rebel.id}.json`)
        );
        const responses = await Promise.all(promises);
        const test = await responses.map((r) => r.data as RebelInfo);
        return (await test)
          ? { data: test as RebelInfo[] }
          : { error: test as FetchBaseQueryError };
      },
    }),
    */
  }),
});

export const { useGetRebelsQuery } = rebelApi;
