import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeHierarchy } from '../../store/hierarchy/actions';

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
    this.dragged.style.display = 'block';
  }

  dragOver(e) {
    this.setState({ target: e.target });
    e.preventDefault();
    this.dragged.style.display = 'none';
  }

  renderTree(list) {
    return list.map(item => (
      item.employees.length === 0 ? <li
        data-id={item.id}
        key={item.id}
        className={`list-item-${item.id.length}`}
        draggable='true'
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
          className={`list-item-${item.id.length}`}
          draggable='true'
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
  filter: state.hierarchy.filter
});
const mapDispatchToProps = dispatch => ({
  change: (personId, leaderId) => {
    dispatch(changeHierarchy(personId, leaderId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
