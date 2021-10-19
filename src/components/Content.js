import "./Content.css";

function Content({ isLoading, isInDictionary, searchKey }) {
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
}

export default Content;
