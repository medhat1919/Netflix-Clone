import React, { createContext, useContext, useState, useEffect } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [myList, setMyList] = useState(() => {
        const savedList = localStorage.getItem('netflix_mylist');
        return savedList ? JSON.parse(savedList) : [];
    });

    useEffect(() => {
        localStorage.setItem('netflix_mylist', JSON.stringify(myList));
    }, [myList]);

    const addToExitingList = (item) => {
        setMyList((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromList = (id) => {
        setMyList((prev) => prev.filter((item) => item.id !== id));
    };

    const isInList = (id) => {
        return myList.some((item) => item.id === id);
    };

    return (
        <ListContext.Provider value={{ myList, addToExitingList, removeFromList, isInList }}>
            {children}
        </ListContext.Provider>
    );
};

export const useList = () => useContext(ListContext);
