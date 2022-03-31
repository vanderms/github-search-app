import { useState } from 'react';

interface Props {
  handleSubmit: (user: string) => void;
}

export default function SearchBar({ handleSubmit }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(searchTerm);
      }}
    >
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
