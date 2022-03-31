import TopBar from './components/top-bar/top-bar';
import SearchBar from './components/search-bar/search-bar';
import CardUser from './components/card-user/card-user';
import { useState, useCallback } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [username, setUsername] = useState<string>('octocat');
  const [found, setFound] = useState<boolean>(true);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const hasFound = useCallback((found) =>  {
    setFound(found);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="nv-main" data-theme={theme}>
        <TopBar handleClick={toggleTheme} />
        <SearchBar
          handleSubmit={(user: string) => setUsername(user)}
          found={found}
        />
        <CardUser username={username} hasFound={hasFound} />
      </main>
    </QueryClientProvider>
  );
}
