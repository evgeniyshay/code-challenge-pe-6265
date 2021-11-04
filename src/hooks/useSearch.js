import { useState, useEffect, useReducer } from "react";

import reducer, { INIT_DICTIONARY } from "reducers/state";
import { fetchDictionaryData } from "services/server";
import { getLocalDictionary, updateLocalDictionary } from "services/storage";

const initialState = new Set();

const useSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isInDictionary, setIsInDictionary] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const words = await fetchDictionaryData(setProgress);

      const dictionarySet = new Set(words);

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

      setProgress(100);
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
    progress,
    isInDictionary,
    searchChangeHandler,
    dispatch,
  };
};

export default useSearch;
