import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, toggleCompletionOfItem } from '../../logic/actions';
import './styles.css';

export const ItemsList = ({ items, onDeleteClick, onCompleteChange }) => {
  return (
    <div>
      <ul className={'itemsList-ul'}>
        {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {items.map(item => <li key={item.id} className={['itemsList-li', item.isCompleted ? 'itemsList-li--strikethrough' : ''].join(' ')}>
          <input
            className="itemsList-complete"
            type="checkbox"
            onChange={e => onCompleteChange(item.id, e.target.checked)} />
          
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
  onDeleteClick: PropTypes.func,
  onCompleteChange: PropTypes.func
};

const mapStateToProps = state => {
  return { items: state.todos.items };
};

const mapDispatchToProps = dispatch => ({
  onDeleteClick: id => dispatch(deleteItem(id)),
  onCompleteChange: id => dispatch(toggleCompletionOfItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
