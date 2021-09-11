import { ChangeEvent, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

type SearchInputProps = {
  placeholder: string;
  searchText: FunctionStringCallback;
};

const SearchInput = ({ placeholder, searchText }: SearchInputProps) => {
  const [text, setText] = useState('');

  const debouncedSave = useCallback(
    debounce((newValue) => searchText(newValue), 500),
    [],
  );

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setText(value);
    debouncedSave(value);
  };

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder={placeholder}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchInput;
