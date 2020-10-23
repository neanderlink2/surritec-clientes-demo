export type ThemeToggleContextType = {
    scheme: 'light' | 'dark',
    setColorSchema: (schema: 'light' | 'dark') => void;
    toggleColorSchema: () => void;
};
