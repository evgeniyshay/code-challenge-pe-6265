import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { ADD_WORD, DELETE_WORD } from "reducers/state";

import "./style.css";

const Header = ({
  searchKey,
  searchChangeHandler,
  isInDictionary,
  dispatch,
}) => {
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
          onClick={() => dispatch({ type: ADD_WORD, data: searchKey })}
        >
          Add
        </button>
      )}
      {isInDictionary && (
        <button
          className="delete-button"
          data-testid="delete-button"
          onClick={() => dispatch({ type: DELETE_WORD, data: searchKey })}
        >
          Delete
        </button>
      )}
    </div>
  );
};

Header.propTypes = {
  searchKey: PropTypes.string,
  searchChangeHandler: PropTypes.func,
  isInDictionary: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default Header;
