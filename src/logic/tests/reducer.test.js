import reducer, { initialState } from '../reducer';
import { addItem, deleteItem } from '../actions';

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  const dummyStateWithTwoItems = {
    items: [
      { id: 1, content: 'first' },
      { id: 2, content: 'second' },
    ]
  }

  it('should add new items on ADD_ITEM', () => {
    const mockAction = addItem('third');
    const result = reducer(dummyStateWithTwoItems, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('should delete the item matching the given id on DELETE_ITEM', () => {
    const mockAction = deleteItem(1);
    const result = reducer(dummyStateWithTwoItems, mockAction);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toEqual(2);
    expect(result.items[0].content).toEqual('second');
  });
});
