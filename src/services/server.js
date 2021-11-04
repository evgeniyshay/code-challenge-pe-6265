const SERVER_URL = "http://localhost/api";

export const fetchDictionaryData = async (setLoadingProgress) => {
  const response = await fetch(`${SERVER_URL}/words`);
  const reader = response.body.getReader();

  const contentLength = +response.headers.get("Content-Length");
  const chunks = [];

  let receivedLength = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    receivedLength += value.length;

    chunks.push(value);

    const currentProgress = parseInt((100 / contentLength) * receivedLength);

    setLoadingProgress(currentProgress);
  }

  const chunksAll = new Uint8Array(receivedLength);

  let position = 0;

  for (let chunk of chunks) {
    chunksAll.set(chunk, position);

    position += chunk.length;
  }

  const result = new TextDecoder("utf-8").decode(chunksAll);

  return JSON.parse(result);
};

export const isInServerDictionary = async (word) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/words/${encodeURIComponent(word)}`
    );
    const data = await response.text();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addToServerDictionary = (word) => {
  if (word.length) {
    fetch(`${SERVER_URL}/words`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ word }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(`HTTP error with status ${response.status}!`);
        }
      })
      .then(({ message }) => {
        console.log(message);
      })
      .catch(({ message }) => {
        console.error(message);
      });
  }
};

export const deleteFromServerDictionary = (word) => {
  if (word.length) {
    fetch(`${SERVER_URL}/words/${encodeURIComponent(word)}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(`HTTP error with status ${response.status}!`);
        }
      })
      .then(({ message }) => {
        console.log(message);
      })
      .catch(({ message }) => {
        console.error(message);
      });
  }
};
