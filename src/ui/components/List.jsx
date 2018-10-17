import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeHierarchy, toggleCollapse, removePerson, initApp } from '../../store/hierarchy/actions';
import i18n from '../../i18n';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null,
    };
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
  }

  componentDidMount() {
    this.props.init();
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragOver(e) {
    this.setState({ target: e.target });
    e.preventDefault();
  }

  dragEnd(e) {
    if (this.state.target.getAttribute('data-id')) {
      this.props.change(
        e.target.getAttribute('data-id'),
        this.state.target.getAttribute('data-id'),
      );
    }
  }

  renderTree(list = []) {
    if (!list.length) {
      return null;
    }
    return list.map((item) => {
      const isMultiple = this.props.filter === 3 && this.props.frequencies
        && this.props.frequencies[item.name] > 1;
      const isBoss = item.employees && item.employees.length;
      return (
        <React.Fragment key={item.id}>
          <li
            data-id={item.id}
            className={`list-item-${item.level}
            ${isMultiple
              ? 'multiple-boss' : ''}`}
            draggable='true'
            onClick={() => isBoss && this.props.toggleCollapse(item.id)}
            onDragEnd={ this.dragEnd }
            onDragStart={ this.dragStart }>
            {isBoss
              ? <span className="collapse-badge">{item.collapsed ? '+' : '-'} </span>
              : null}
            {
              this.props.filter !== 2 ? (
                <React.Fragment>
                  <span data-id={item.id}>
                    {isMultiple ? (
                      <span
                        data-id={item.id}
                        className="remove"
                        onClick={() => this.props.removePerson(item.id)}
                      >
                        {i18n.t('buttons.remove')}
                      </span>
                    ) : null}
                    {item.name}
                  </span>
                  <br />
                </React.Fragment>
              ) : null
            }
            {
              this.props.filter !== 1 ? (
                <span data-id={item.id} className="position">{item.position}</span>
              ) : null
            }
          </li>
          {item.collapsed ? null : this.renderTree(item.employees)}
        </React.Fragment>
      );
    });
  }

  render() {
    return (
      <div className="list-component">
        <ul onDragOver={this.dragOver}>
          {this.renderTree(this.props.items)}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  init: PropTypes.func,
  change: PropTypes.func,
  toggleCollapse: PropTypes.func,
  filter: PropTypes.number,
  frequencies: PropTypes.object,
  removePerson: PropTypes.func,
};

const mapStateToProps = state => ({
  items: state.hierarchy.employees,
  frequencies: state.hierarchy.frequencies,
  filter: state.hierarchy.filter,
});
const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(initApp());
  },
  change: (personId, leaderId) => {
    dispatch(changeHierarchy(personId, leaderId));
  },
  toggleCollapse: (personId) => {
    dispatch(toggleCollapse(personId));
  },
  removePerson: (personId) => {
    dispatch(removePerson(personId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
