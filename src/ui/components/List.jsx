import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const placeholder = document.createElement('li');
placeholder.className = 'placeholder';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || JSON.parse(window.localStorage.getItem('file')),
      target: null,
    };
  }

  traverseDataToFindDragged(list, dragged) {
    let data = null;
    if (dragged.length > 1) {
      data = this.traverseDataToFindDragged(
        list[dragged.charAt(0)][Object.keys(list[dragged.charAt(0)])].employees,
        dragged.substring(1, dragged.length),
      );
    } else {
      data = list[dragged.charAt(0)];
      // eslint-disable-next-line
      delete list[dragged.charAt(0)];
      return data;
    }
    return data;
  }

  traverseDataToFindTarget(list, target, dragged) {
    if (target.length > 1) {
      this.traverseDataToFindTarget(
        list[target.charAt(0)][Object.keys(list[target.charAt(0)])].employees,
        target.substring(1, target.length),
        dragged,
      );
    } else {
      // eslint-disable-next-line
      list[list.length] = this.traverseDataToFindDragged(
        this.state.employees, dragged,
      );
    }
    return true;
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(e) {
    if (this.state.target.getAttribute('address')) {
      this.traverseDataToFindTarget(
        this.state.employees, this.state.target.getAttribute('address'), e.target.getAttribute('address'),
      );
    }
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);
    const data = this.state.employees;
    this.setState({ employees: data });
  }

  dragOver(e) {
    this.setState({ target: e.target });
    e.preventDefault();
    this.dragged.style.display = 'none';
    if (e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  renderTree(list, counter, address) {
    return list.map((item, index) => (
      item[Object.keys(item)].employees.length === 0 ? <li
        data-id={index}
        level={counter}
        address={address + index}
        key={index}
        className={`list-item-${counter}`}
        draggable='true'
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={
          this.dragStart.bind(this)}>
        { Object.keys(item) } | { item[Object.keys(item)].position }
      </li> : [
        <li
          data-id={index}
          level={counter}
          address={address + index}
          key={index}
          className={`list-item-${counter}`}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={
            this.dragStart.bind(this)}
        >{ Object.keys(item) } | { item[Object.keys(item)].position }</li>,
        this.renderTree(item[Object.keys(item)].employees, counter + 1, (address + index)),
      ]
    ));
  }

  render() {
    const listItems = this.renderTree(this.state.items, 1, '');
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
};

const mapStateToProps = state => ({
  items: state.hierarchy.employees,
});

export default connect(mapStateToProps, null)(List);
