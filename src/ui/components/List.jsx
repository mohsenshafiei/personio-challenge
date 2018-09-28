import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeHierarchy, toggleCollapse, removeMultiplePerson } from '../../store/hierarchy/actions';

import i18n from '../../i18n';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null,
    };
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(e) {
    if (this.state.target.getAttribute('data-id')) {
      this.props.change(
        e.target.getAttribute('data-id'),
        this.state.target.getAttribute('data-id'),
      );
    }
  }

  dragOver(e) {
    this.setState({ target: e.target });
    e.preventDefault();
  }

  renderTree(list) {
    return list.map(item => (
      item.employees.length === 0 ? <li
        data-id={item.id}
        key={item.id}
        className={`list-item-${item.id.length}
        ${this.props.filter === 3 && this.props.frequencies && this.props.frequencies[item.name] > 1
          ? 'multiple-boss' : ''}` }
        draggable='true'
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={
          this.dragStart.bind(this)}>
        { this.props.filter !== 2
          ? <span data-id={item.id}>
            {this.props.filter === 3
            && this.props.frequencies
            && this.props.frequencies[item.name] > 1
              ? <span
                  data-id={item.id}
                  className="remove"
                  onClick={() => this.props.removeMultiplePerson(item.id)}
                >
                {i18n.t('buttons.remove')}
                </span> : null
            }
            {item.name }
            </span> : null}
        { this.props.filter !== 1
          ? <span data-id={item.id} className="position-leaf">{item.position}</span> : null}
      </li> : [
        <li
          data-id={item.id}
          key={item.id}
          className={`list-item-${item.id.length}
          ${this.props.filter === 3 && this.props.frequencies && this.props.frequencies[item.name] > 1
            ? 'multiple-boss' : ''}`}
          draggable='true'
          onClick={() => this.props.toggleCollapse(item.id)}
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>
          {
            this.props.filter !== 2
              ? <span data-id={item.id}>
                  <span className="collapse-badge">{item.collapsed ? '+' : '-'} </span>
                  {this.props.filter === 3
                  && this.props.frequencies
                  && this.props.frequencies[item.name] > 1
                    ? <span
                        data-id={item.id}
                        className="remove"
                        onClick={() => this.props.removeMultiplePerson(item.id)}
                      >
                        {i18n.t('buttons.remove')}
                      </span> : null
                  }
                {item.name}
                </span> : null
          }
          {
            this.props.filter !== 1
              ? <span data-id={item.id} className="position">
                { this.props.filter !== 0 && this.props.filter !== 3 ? <span className="collapse-badge">{item.collapsed ? '+' : '-'} </span> : null}
                {item.position}
                </span> : null
          }
        </li>,
        item.collapsed ? null : this.renderTree(item.employees),
      ]
    ));
  }

  render() {
    const listItems = this.renderTree(this.props.items);
    return (
      <div className="list-component">
        <ul onDragOver={this.dragOver.bind(this)}>
          {listItems}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  change: PropTypes.func,
  toggleCollapse: PropTypes.func,
  filter: PropTypes.number,
  frequencies: PropTypes.object,
  removeMultiplePerson: PropTypes.func,
};

const mapStateToProps = state => ({
  items: state.hierarchy.employees,
  frequencies: state.hierarchy.frequencies,
  filter: state.hierarchy.filter,
});
const mapDispatchToProps = dispatch => ({
  change: (personId, leaderId) => {
    dispatch(changeHierarchy(personId, leaderId));
  },
  toggleCollapse: (personId) => {
    dispatch(toggleCollapse(personId));
  },
  removeMultiplePerson: (personId) => {
    dispatch(removeMultiplePerson(personId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
