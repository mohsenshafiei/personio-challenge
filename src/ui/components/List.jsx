import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeHierarchy } from '../../store/hierarchy/actions';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null,
      collapse: [],
    };
  }

  collapse(id) {
    if (this.refs[`${id}0`] && this.refs[`${id}0`].classList.contains('collapse')) {
      this.refs[`${id}0`].classList.remove('collapse');
    }
    for (let i = 0; i < 10; i += 1) {
      if (this.refs[`${id}${i}`] && this.refs[`${id}${i}`].classList.contains('collapse')) {
        this.refs[`${id}${i}`].classList.remove('collapse');
      }
    }
  }

  handleCollapse(id) {
    Object.keys(this.refs).map((item) => {
      if (id !== item && id === item.substr(0, item.length - (item.length - id.length))) {
        if (item.length - id.length === 1) {
          this.refs[item].classList.toggle('collapse');
        } else {
          this.refs[item].classList.add('collapse');
        }
      }
      return true;
    });
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(e) {
    if (this.state.target.getAttribute('data-id') !== '0') {
      this.collapse(this.state.target.getAttribute('data-id'));
    }
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
        ref={item.id}
        className={`list-item-${item.id.length}` }
        draggable='true'
        onClick={
          this.handleCollapse.bind(this, item.id)
        }
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={
          this.dragStart.bind(this)}>
        { (this.props.filter === 'All' || this.props.filter === 'Name')
        && <span data-id={item.id}>{item.name }</span>}
        { (this.props.filter === 'All' || this.props.filter === 'Position')
        && <span data-id={item.id} className="position">{item.position}</span>}
      </li> : [
        <li
          data-id={item.id}
          key={item.id}
          ref={item.id}
          className={`list-item-${item.id.length}`}
          draggable='true'
          onClick={
            this.handleCollapse.bind(this, item.id)
          }
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={
            this.dragStart.bind(this)}
        >{ (this.props.filter === 'All' || this.props.filter === 'Name')
        && <span data-id={item.id}>{item.name }</span>}
        { (this.props.filter === 'All' || this.props.filter === 'Position')
        && <span data-id={item.id} className="position">{item.position}</span> } </li>,
        this.renderTree(item.employees),
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
  filter: PropTypes.string,
};

const mapStateToProps = state => ({
  items: state.hierarchy.employees,
  filter: state.hierarchy.filter,
});
const mapDispatchToProps = dispatch => ({
  change: (personId, leaderId) => {
    dispatch(changeHierarchy(personId, leaderId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
