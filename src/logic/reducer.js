import { ADD_ITEM, DELETE_ITEM } from './constants';

export const initialState = {
  items: [
    { id: 1, content: 'Call mum' },
    { id: 2, content: 'Buy cat food' },
    { id: 3, content: 'Water the plants' },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    default:
      return state;
  }
};

export default reducer;
