import React, { useEffect, useState } from "react";

export function usePersistedState<T = any>(
    key: string,
    defaultState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(defaultState);

    useEffect(() => {
        if (localStorage.getItem(key)) {
            setState(JSON.parse(localStorage.getItem(key) ?? ""));
        }
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
