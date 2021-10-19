import { useState, useEffect, useReducer } from "react";

import reducer, { INIT_DICTIONARY } from "reducers/state";
import { getLocalDictionary, updateLocalDictionary } from "services/storage";

import dictionary from "data/dictionary.txt";

const initialState = new Set();

const useSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInDictionary, setIsInDictionary] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionaryFetch = await fetch(dictionary);
      const dictionaryText = await dictionaryFetch.text();

      const dictionarySet = new Set(dictionaryText.split("\n"));

      dictionarySet.delete("");

      dispatch({ type: INIT_DICTIONARY, data: dictionarySet });

      setIsLoading(false);
    };

    const localDictionary = getLocalDictionary();

    if (localDictionary === null) {
      fetchDictionary();
    } else {
      dispatch({
        type: INIT_DICTIONARY,
        data: new Set(JSON.parse(localDictionary)),
      });

      setIsLoading(false);
    }

    return () => {
      dispatch({ type: INIT_DICTIONARY, data: initialState });
    };
  }, []);

  useEffect(() => {
    updateLocalDictionary(state);

    setSearchKey("");
    setIsInDictionary(null);
  }, [state]);

  function searchChangeHandler(e) {
    const key = e.target.value;

    setSearchKey(key);

    setIsInDictionary(key !== "" ? state.has(key) : null);
  }

  return {
    state,
    searchKey,
    isLoading,
    isInDictionary,
    searchChangeHandler,
    dispatch,
  };
};

export default useSearch;
