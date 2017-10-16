import React from 'react';
import { shallow } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  onDeleteClick: () => null,
  onCompleteChange: () => null
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

    expect(renderedItem.find('.itemsList-li')).toHaveLength(2);
  });

  it('should not render completed items if `hide completed items` filter is activated', () => {
    const items = [{ id: 1, content: 'Test 1', isCompleted: true }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(
      <ItemsList
        {...defaultProps}
        items={items}
        isFilterHideCompletedActivated={true}
      />);

    expect(renderedItem.find('.itemsList-li')).toHaveLength(1);
    expect(renderedItem.find('.itemsList-li').at(0).key()).toEqual('2');
  });

  describe('delete', () => {
    it('should render a delete button next to each item', () => {
      const renderedItem = renderItemsListWithItems()

      expect(renderedItem.find('.itemsList-li button.itemsList-delete')).toHaveLength(2);
    });

    it(`should trigger onDeleteClick, passing item id, when the delete button is clicked`, () => {
      const mockOnDeleteClickHandler = jest.fn();
      const renderedItem =
        renderItemsListWithItems({
          onDeleteClick: mockOnDeleteClickHandler
        });
      
      renderedItem.find('.itemsList-li button.itemsList-delete').at(1).simulate('click')

      expect(mockOnDeleteClickHandler).toHaveBeenCalled();
      expect(mockOnDeleteClickHandler).toHaveBeenCalledWith(2);
    });
  });

  describe('complete', () => {
    it('should render a checkbox next to each item', () => {
      const renderedItem = renderItemsListWithItems()
      
      expect(renderedItem.find('.itemsList-li input[type="checkbox"].itemsList-complete')).toHaveLength(2);
    });

    it(`should trigger onCompleteChange, passing item id, when the checkbox is changed`, () => {
      const mockOnCompleteChangeHandler = jest.fn();
      const renderedItem = renderItemsListWithItems({
        onCompleteChange: mockOnCompleteChangeHandler
      })

      renderedItem.find('.itemsList-li .itemsList-complete').at(0).simulate('change', { target: { checked: true } })
      
      expect(mockOnCompleteChangeHandler).toHaveBeenCalledWith(1, true);
    });

    it('should check and strike-through the completed item, and only the completed item', () => {
      const items = [{ id: 1, content: 'Test 1', isCompleted: true }, { id: 2, content: 'Test 2', isCompleted: false }];
      const renderedItem = shallow(
        <ItemsList
          {...defaultProps}
          items={items} />);

      expect(renderedItem.find('li').at(0).hasClass('itemsList-li--strikethrough')).toBeTruthy();
      expect(renderedItem.find('li').at(1).hasClass('itemsList-li--strikethrough')).toBeFalsy();
      expect(renderedItem.find('li input.itemsList-complete').at(0).prop('checked')).toBeTruthy();
    })
  });
});
