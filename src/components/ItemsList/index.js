import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, toggleCompletionOfItem } from '../../logic/actions';
import './styles.css';

const exceptCompleted = (item) =>
  !(item.isCompleted)

const applyFilters = (isFilterHideCompletedActivated, items) =>
  isFilterHideCompletedActivated
    ? items.filter(exceptCompleted)
    : items;

export const ItemsList = ({
  items, 
  onDeleteClick,
  onCompleteChange,
  isFilterHideCompletedActivated
}) => {
  const filteredItems = applyFilters(isFilterHideCompletedActivated, items)

  return (
    <div>
      <ul className={'itemsList-ul'}>
        {filteredItems.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {filteredItems.map(item =>
          <li key={item.id}
              className={[
                'itemsList-li',
                item.isCompleted ? 'itemsList-li--strikethrough' : ''
              ].join(' ')}>
            <input
              className="itemsList-complete"
              type="checkbox"
              onChange={e => onCompleteChange(item.id, e.target.checked)}
              checked={item.isCompleted} />
            
            {item.content}
            
            <button
              className="itemsList-delete"
              onClick={() => onDeleteClick(item.id)}>Delete</button>
          </li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.string,
      isCompleted: PropTypes.bool
    })).isRequired,
  isFilterHideCompletedActivated: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  onCompleteChange: PropTypes.func
};

const mapStateToProps = state => ({
  items: state.todos.items,
  isFilterHideCompletedActivated: state.todos.isFilterHideCompletedActivated
});

const mapDispatchToProps = dispatch => ({
  onDeleteClick: id => dispatch(deleteItem(id)),
  onCompleteChange: id => dispatch(toggleCompletionOfItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
