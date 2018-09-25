import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const {
    title,
    items,
    display,
    onSelect,
  } = props;

  return (
    /* eslint-disable jsx-a11y/label-has-for */
    <div className={`filter ${display === 'block' ? 'filter--block' : 'filter--inline-block'}`}>
      <div className="container">
        <p className="main-label">{title}</p>
      </div>
      {items.map(item => (
        <div
          className="container"
          key={`filter-${item.id}`}
        >
          <input id={`filter-${item.id}`} name="radio" type="radio" onClick={() => { onSelect(item); }} />
          <label htmlFor={`filter-${item.id}`} className="label">{item.title}</label>
        </div>
      ))}
    </div>
  );
};

Filter.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  display: PropTypes.oneOf(['inline', 'inline-block']),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
};

Filter.defaultProps = {
  display: 'inline',
};

export default Filter;
