import React from 'react';
import { shallow } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  onDeleteClick: () => null
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  const renderItemsListWithItems = (props) => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(
      <ItemsList
        {...defaultProps}
        {...props}
        items={items} />);
    return renderedItem;
  }

  it('should render items as list items', () => {
    const renderedItem = renderItemsListWithItems()
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  describe('delete', () => {
    it('should render a delete button next to each item', () => {
      const renderedItem = renderItemsListWithItems()
      expect(renderedItem.find('li button.itemsList-delete')).toHaveLength(2);
    });

    it(`should trigger onDeleteClick, passing item id, when the delete button is clicked`, () => {
      const mockOnDeleteClickHandler = jest.fn();
      const renderedItem =
        renderItemsListWithItems({
          onDeleteClick: mockOnDeleteClickHandler
        });
      
      renderedItem.find('li button.itemsList-delete').at(1).simulate('click')

      expect(mockOnDeleteClickHandler).toHaveBeenCalled();
      expect(mockOnDeleteClickHandler).toHaveBeenCalledWith(2);
    });
  });
});
