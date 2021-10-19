import Header from "components/Header";
import Content from "components/Content";

import useSearch from "hooks/useSearch";

import "./style.css";

const App = () => {
  const {
    state,
    searchKey,
    isLoading,
    isInDictionary,
    searchChangeHandler,
    dispatch,
  } = useSearch();

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
};

export default App;
