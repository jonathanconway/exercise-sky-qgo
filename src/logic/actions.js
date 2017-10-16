import { ADD_ITEM, DELETE_ITEM, TOGGLE_COMPLETION_OF_ITEM } from './constants';

export const addItem = content => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = id => {
  return { type: DELETE_ITEM, id };
};

export const toggleCompletionOfItem = id => {
  return { type: TOGGLE_COMPLETION_OF_ITEM, id };
};
