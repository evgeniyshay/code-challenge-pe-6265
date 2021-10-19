import PropTypes from "prop-types";
import "./style.css";

const Content = ({ isLoading, isInDictionary, searchKey }) => {
  let contentText = "";
  let contentClass = "basic";

  if (isInDictionary === null) {
    contentText = "Enter your word to find it in the dictionary.";
  } else if (isInDictionary) {
    contentClass = "success";
    contentText = `The word '${searchKey}' is already in the dictionary. You can delete it.`;
  } else {
    contentClass = "error";
    contentText = "There is no such word in the dictionary! You can add it.";
  }

  return (
    <div className={`App-content content-${contentClass}`}>
      {!isLoading ? contentText : "Loading..."}
    </div>
  );
};

Content.propTypes = {
  isLoading: PropTypes.bool,
  isInDictionary: PropTypes.bool,
  searchKey: PropTypes.string,
};

export default Content;
