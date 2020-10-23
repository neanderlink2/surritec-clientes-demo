import React, { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { usePersistedState } from "../../hooks/usePersistedState";
import { ThemeToggleContextType } from "./types";

const ThemeToggleContext = createContext<ThemeToggleContextType>({
    scheme: 'light',
    setColorSchema: (schema) => { },
    toggleColorSchema: () => { }
});

export const useThemeToggle = () => {
    const context = useContext(ThemeToggleContext);
    return context;
};

export default function ThemeToggleProvider({ children, initialSchema = "light" }: PropsWithChildren<{ initialSchema: 'light' | 'dark' }>) {
    const [schema, setSchema] = usePersistedState('colorSchema', initialSchema);

    const toggle = useCallback(() => setSchema(schema === "light" ? 'dark' : 'light'), [schema, setSchema]);

    return (
        <ThemeToggleContext.Provider value={{ scheme: schema, setColorSchema: setSchema, toggleColorSchema: toggle }}>
            {children}
        </ThemeToggleContext.Provider>
    )
}