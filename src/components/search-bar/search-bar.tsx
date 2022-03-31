import { useState } from 'react';

interface Props {
  found: boolean;
  handleSubmit: (user: string) => void; 
}

export default function SearchBar({ found, handleSubmit }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <form
      className="nv-search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(searchTerm);
      }}
    >
      { !found && <p className="not-found">no results</p> }
      <input
        type="text"
        id="search-input"
        placeholder="..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        required
      />
      <label className="label" htmlFor="search-input">
        Search GitHub username…
      </label>
      
      <input className="btn" type="submit" value="Search" />
    </form>
  );
}
