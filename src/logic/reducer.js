import {
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_COMPLETION_OF_ITEM,
  TOGGLE_FILTER_HIDE_COMPLETED
} from './constants';

export const initialState = {
  filterHideCompleted: false,
  items: [
    { id: 1, content: 'Call mum'        , isCompleted: false },
    { id: 2, content: 'Buy cat food'    , isCompleted: false },
    { id: 3, content: 'Water the plants', isCompleted: false },
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
    case TOGGLE_COMPLETION_OF_ITEM:
      const toggleItemCompleteFlagIfMatched =
        item => ({
          ...item,
          isCompleted: item.id === action.id
            ? !item.isCompleted
            : item.isCompleted
        })

      return {
        ...state,
        items: state.items.map(toggleItemCompleteFlagIfMatched)
      }
    case TOGGLE_FILTER_HIDE_COMPLETED:
      return {
        ...state,
        isFilterHideCompletedActivated: !state.isFilterHideCompletedActivated
      }
    default:
      return state;
  }
};

export default reducer;
