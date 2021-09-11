import { useMemo } from 'react';

const useSearch = <T>(
  data: T[],
  searchText: string,
  searchProps: (item: T) => string[],
) => {
  return useMemo(() => {
    if (!searchText) {
      return {
        data: [],
        total: 0,
      };
    }
    const regex = new RegExp(searchText, 'i');
    const dataToReturn = data
      .filter((item) => searchProps(item).some((regx) => regex.test(regx)))
      .slice(0, 10);
    return {
      data: dataToReturn,
      total: dataToReturn.length,
    };
  }, [data, searchText, searchProps]);
};

export default useSearch;
