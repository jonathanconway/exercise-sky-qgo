import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFilterHideCompleted } from '../../logic/actions';

export const ItemsFilter = ({ isFilterHideCompletedActivated, onHideCompletedChange }) => {
  return (<fieldset>
    <legend>Filters</legend>
    
    <label htmlFor="hide-completed">
      <input
        type="checkbox"
        id="hide-completed"
        checked={isFilterHideCompletedActivated}
        onChange={onHideCompletedChange} />
      Hide completed items
    </label>
  </fieldset>)
}

ItemsFilter.propTypes = {
  isFilterHideCompletedActivated: PropTypes.bool
}

const mapStateToProps = state => ({
  isFilterHideCompletedActivated: state.todos.isFilterHideCompletedActivated
});

const mapDispatchToProps = dispatch => ({
  onHideCompletedChange: () => dispatch(toggleFilterHideCompleted())
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsFilter);