import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/layout';
import SearchInput from '../components/search-input';
import useApiData from '../hooks/use-api-data';
import useSearch from '../hooks/use-search';
import Airport from '../types/airport';

const Page: NextPage = () => {
  const [searchInputText, setSearchInputText] = useState('');
  const airports = useApiData<Airport[]>('/api/airports', []);

  useEffect(() => {
    return () => setSearchInputText('');
  }, []);

  const filteredAirports = useSearch(
    airports,
    searchInputText,
    ({ name, iata, city, country }: Airport) => [name, iata, city, country],
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Code Challenge: Airports</h1>
      <SearchInput
        placeholder="Start typing to look up airport information..."
        searchText={(textValue) => setSearchInputText(textValue)}
      />
      <br />
      {`${filteredAirports.total} airports found`}
      <div>
        {searchInputText &&
          filteredAirports.data.map((airport) => (
            <Link
              href={`/airports/${airport.iata.toLowerCase()}`}
              key={airport.iata}
            >
              <a className="flex items-center p-5 mt-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none">
                <span>
                  {airport.name}, {airport.city}
                </span>
                <span className="ml-auto text-gray-500">{airport.country}</span>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export default Page;
