import React from 'react';
import { shallow } from 'enzyme';
import { ItemsFilter } from '../index';

const defaultProps = {
  isFilterHideCompletedActivated: false,
  onHideCompletedChange: () => null
};

describe('ItemsFilter', () => {
  it('renders without crashing', () => {
    shallow(<ItemsFilter {...defaultProps} />);
  });

  describe('hide completed items', () => {
    it('should display checkbox inside a label inside a fieldset', () => {
      const renderedItem = shallow(<ItemsFilter {...defaultProps} />);
      
      expect(renderedItem.find('fieldset > label > input[type="checkbox"]#hide-completed')).toHaveLength(1);
    });

    it('should be checked if the filter is activated', () => {
      const renderedItem = shallow(<ItemsFilter {...defaultProps} isFilterHideCompletedActivated={true} />);
      
      expect(renderedItem.find('#hide-completed').prop('checked')).toBeTruthy();
    });

    it('should trigger onHideCompletedChange when filter is changed, ', () => {
      const mockOnHideCompletedChangeHandler = jest.fn();
      const renderedItem = shallow(
        <ItemsFilter
          {...defaultProps}
          onHideCompletedChange={mockOnHideCompletedChangeHandler}
        />);

      renderedItem.find('#hide-completed').simulate('change');

      expect(mockOnHideCompletedChangeHandler).toHaveBeenCalled();
    });
  });
});
