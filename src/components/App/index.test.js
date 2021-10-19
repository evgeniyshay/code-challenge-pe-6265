import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from ".";

const fakeDictionary = `A
a
aa
aal
aalii
aam
abacist
aback
n
new`;

describe("App component", () => {
  test("first render", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve(fakeDictionary),
      })
    );

    await act(async () => {
      render(<App />);
    });

    const searchField = screen.getByTestId("search-field");
    expect(searchField).toBeInTheDocument();

    const firstContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(firstContent).toBeInTheDocument();

    const footer = screen.getByText(
      `Total dictionary words count: ${fakeDictionary.split("\n").length}`
    );
    expect(footer).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("find word that is in the dictionary", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve(fakeDictionary),
      })
    );

    await act(async () => {
      render(<App />);
    });

    const firstContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(firstContent).toBeInTheDocument();

    const searchField = screen.getByTestId("search-field");
    const searchKey = "new";
    userEvent.type(searchField, searchKey);
    expect(searchField).toHaveValue(searchKey);

    const changedContent = screen.getByText(
      `The word '${searchKey}' is already in the dictionary. You can delete it.`
    );
    expect(changedContent).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("find word that is not in the dictionary", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve(fakeDictionary),
      })
    );

    await act(async () => {
      render(<App />);
    });

    const firstContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(firstContent).toBeInTheDocument();

    const searchField = screen.getByTestId("search-field");
    const searchKey = "test";
    userEvent.type(searchField, searchKey);
    expect(searchField).toHaveValue(searchKey);

    const changedContent = screen.getByText(
      "There is no such word in the dictionary! You can add it."
    );
    expect(changedContent).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("add word that is not in the dictionary", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve(fakeDictionary),
      })
    );

    await act(async () => {
      render(<App />);
    });

    const firstContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(firstContent).toBeInTheDocument();

    const dictionaryLength = fakeDictionary.split("\n").length;
    const footer = screen.getByText(
      `Total dictionary words count: ${dictionaryLength}`
    );
    expect(footer).toBeInTheDocument();

    const searchField = screen.getByTestId("search-field");
    const searchKey = "test";
    userEvent.type(searchField, searchKey);
    expect(searchField).toHaveValue(searchKey);

    const changedContent = screen.getByText(
      "There is no such word in the dictionary! You can add it."
    );
    expect(changedContent).toBeInTheDocument();

    const addButton = screen.getByTestId("add-button");
    userEvent.click(addButton);
    expect(searchField).toHaveValue("");

    const lastContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(lastContent).toBeInTheDocument();

    const newFooter = screen.getByText(
      `Total dictionary words count: ${dictionaryLength + 1}`
    );
    expect(newFooter).toBeInTheDocument();

    userEvent.type(searchField, searchKey);
    expect(searchField).toHaveValue(searchKey);

    const newContent = screen.getByText(
      `The word '${searchKey}' is already in the dictionary. You can delete it.`
    );
    expect(newContent).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("delete word that is in the dictionary", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve(fakeDictionary),
      })
    );

    await act(async () => {
      render(<App />);
    });

    const firstContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(firstContent).toBeInTheDocument();

    const dictionaryLength = fakeDictionary.split("\n").length;
    const footer = screen.getByText(
      `Total dictionary words count: ${dictionaryLength + 1}`
    );

    expect(footer).toBeInTheDocument();

    const searchField = screen.getByTestId("search-field");
    const searchKey = "new";
    userEvent.type(searchField, searchKey);
    expect(searchField).toHaveValue(searchKey);

    const changedContent = screen.getByText(
      `The word '${searchKey}' is already in the dictionary. You can delete it.`
    );
    expect(changedContent).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-button");
    userEvent.click(deleteButton);
    expect(searchField).toHaveValue("");

    const lastContent = screen.getByText(
      "Enter your word to find it in the dictionary."
    );
    expect(lastContent).toBeInTheDocument();

    const newFooter = screen.getByText(
      `Total dictionary words count: ${dictionaryLength}`
    );
    expect(newFooter).toBeInTheDocument();

    userEvent.type(searchField, searchKey);
    expect(searchField).toHaveValue(searchKey);

    const newContent = screen.getByText(
      "There is no such word in the dictionary! You can add it."
    );
    expect(newContent).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
