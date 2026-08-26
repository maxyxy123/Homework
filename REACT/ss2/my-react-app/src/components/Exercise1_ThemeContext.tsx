import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: '16px' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
 
  if (!context) {
    throw new Error('useTheme phải được sử dụng bên trong <ThemeProvider>');
  }
  return context;
};

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
      <span>Header - Theme hiện tại: <strong>{theme}</strong></span>
      <button onClick={toggleTheme} style={{ marginLeft: '12px' }}>Chuyển Theme</button>
    </header>
  );
};

export const MainContent = () => {
  const { theme } = useTheme();
  return <main style={{ padding: '16px 0' }}>Nội dung chính ({theme} mode)</main>;
};

export const Footer = () => {
  const { theme } = useTheme();
  return <footer style={{ borderTop: '1px solid #ccc', paddingTop: '8px' }}>Footer ({theme} mode)</footer>;
};