export const INIT_DICTIONARY = "init";
export const ADD_WORD = "add";
export const DELETE_WORD = "delete";

export default function reducer(state, action) {
  switch (action.type) {
    case INIT_DICTIONARY:
      return new Set(action.data);

    case ADD_WORD:
      return new Set(state).add(action.data);

    case DELETE_WORD:
      const newState = new Set(state);

      newState.delete(action.data);

      return newState;

    default:
      throw new Error("Action type is invalid");
  }
}
