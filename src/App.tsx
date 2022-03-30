import TopBar from './components/top-bar/top-bar';
import { useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <main className="nv-main" data-theme={theme}>
      <TopBar handleClick={toggleTheme} />
    </main>
  );
}
