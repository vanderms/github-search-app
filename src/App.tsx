import TopBar from './components/top-bar/top-bar';
import SearchBar from './components/search-bar/search-bar';
import CardUser from './components/card-user/card-user';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [username, setUsername] = useState<string>('octocat');

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className="nv-main" data-theme={theme}>
        <TopBar handleClick={toggleTheme} />
        <SearchBar handleSubmit={(user: string) => setUsername(user)} />
        <CardUser username={username}/>
      </main>
    </QueryClientProvider>
  );
}
