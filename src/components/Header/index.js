import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { ADD_WORD, DELETE_WORD } from "reducers/state";
import * as server from "services/server";

import "./style.css";

const Header = ({
  searchKey,
  searchChangeHandler,
  isInDictionary,
  dispatch,
}) => {
  const [updated, setUpdated] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [updated]);

  const onClickHandler = async (type) => {
    dispatch({ type, data: searchKey });

    const { isInServerDictionary } = server;

    let methodName = "";
    let checkRule = await isInServerDictionary(searchKey);

    // eslint-disable-next-line default-case
    switch (type) {
      case ADD_WORD:
        methodName += `${ADD_WORD}To`;
        checkRule = !checkRule;

        break;
      case DELETE_WORD:
        methodName += `${DELETE_WORD}From`;

        break;
    }

    methodName += "ServerDictionary";

    if (!!checkRule) {
      server[methodName](searchKey);
    }

    setUpdated((update) => !update);
  };

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
          onClick={() => onClickHandler(ADD_WORD)}
        >
          Add
        </button>
      )}
      {isInDictionary && (
        <button
          className="delete-button"
          data-testid="delete-button"
          onClick={() => onClickHandler(DELETE_WORD)}
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
