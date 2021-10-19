const LOCAL_DICTIONARY = "dictionary";

export const getLocalDictionary = () => localStorage.getItem(LOCAL_DICTIONARY);

export const updateLocalDictionary = (state) =>
  localStorage.setItem(LOCAL_DICTIONARY, JSON.stringify([...state]));
