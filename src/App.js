import { useState, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import dictionary from "./data/dictionary.txt";
import "./App.css";

const LOCAL_DICTIONARY = "dictionary";
const initialState = new Set();

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return new Set(action.data);
    case "add":
      return new Set(state).add(action.data);
    case "delete":
      const newState = new Set(state);

      newState.delete(action.data);

      return newState;
    default:
      throw new Error("Action type is invalid");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInDictionary, setIsInDictionary] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionaryText = await fetch(dictionary).then((textData) =>
        textData.text()
      );

      const dictionarySet = new Set(dictionaryText.split("\n"));

      dictionarySet.delete("");

      dispatch({ type: "init", data: dictionarySet });

      setIsLoading(false);
    };

    const localDictionary = localStorage.getItem(LOCAL_DICTIONARY);

    if (localDictionary === null) {
      fetchDictionary();
    } else {
      dispatch({ type: "init", data: new Set(JSON.parse(localDictionary)) });

      setIsLoading(false);
    }

    return () => {
      dispatch({ type: "init", data: initialState });
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_DICTIONARY, JSON.stringify([...state]));

    setSearchKey("");
    setIsInDictionary(null);
  }, [state]);

  function searchChangeHandler(e) {
    const key = e.target.value;

    setSearchKey(key);

    setIsInDictionary(key !== "" ? state.has(key) : null);
  }

  return (
    <div className="App">
      <Header
        searchKey={searchKey}
        searchChangeHandler={searchChangeHandler}
        isInDictionary={isInDictionary}
        dispatch={dispatch}
      />
      <Content
        isLoading={isLoading}
        isInDictionary={isInDictionary}
        searchKey={searchKey}
      />
      <div data-testid="footer" className="App-footer">
        {!isLoading
          ? `Total dictionary words count: ${state.size}`
          : "Loading..."}
      </div>
    </div>
  );
}

export default App;
