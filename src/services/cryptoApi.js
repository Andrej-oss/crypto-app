import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '33fa0f0be7mshbfbf0b247f3dadep157b67jsn4df56dc89b90'
};
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url) => ({ url, headers });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCrypto: builder.query({
      query: () => createRequest('/coins')
    })
  })
});
export const {
  useGetCryptoQuery
} = cryptoApi;
// var options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     symbols: 'BTC',
//     uuids: 'Qwsogvtv82FCd',
//     tiers: '1',
//     tags: 'defi',
//     orderBy: 'marketCap',
//     search: 'Bitco',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//     'x-rapidapi-key': '33fa0f0be7mshbfbf0b247f3dadep157b67jsn4df56dc89b90'
//   }
// };