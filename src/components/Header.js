import { useEffect, useRef } from "react";
import "./Header.css";

function Header({ searchKey, searchChangeHandler, isInDictionary, dispatch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div data-testid="header" className="App-top-bar">
      <input
        name="search"
        type="search"
        value={searchKey}
        onChange={searchChangeHandler}
        data-testid="search-field"
        ref={inputRef}
      />
      {!isInDictionary && isInDictionary !== null && searchKey !== "" && (
        <button
          className="add-button"
          data-testid="add-button"
          onClick={() => dispatch({ type: "add", data: searchKey })}
        >
          Add
        </button>
      )}
      {isInDictionary && (
        <button
          className="delete-button"
          data-testid="delete-button"
          onClick={() => dispatch({ type: "delete", data: searchKey })}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default Header;
