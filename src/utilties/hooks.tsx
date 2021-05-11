import { useState } from 'react';
import { atom } from 'jotai';

export interface IUserInfo {
    phoneNumber?: string;
}

const initialUserInfoAtom = atom(JSON.parse(localStorage.getItem('userInformation') ?? '{}'));
export const userInfoAtom = atom(
    (get) => get(initialUserInfoAtom),
    (get, set, update: any) => {
        try {
            // Save to local storage
            window.localStorage.setItem('userInformation', JSON.stringify(update));

            // Allow value to be a function so we have same API as useState
            // Save state
            set(initialUserInfoAtom, update);
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    }
);

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue] as const;
};