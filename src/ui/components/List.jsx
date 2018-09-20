import React from 'react';
import PropTypes from 'prop-types';

const placeholder = document.createElement('li');
placeholder.className = 'placeholder';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
    };
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(e) {
    console.log(e);
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);
    const data = this.state.employees;
    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);
    if (from < to) to -= 1;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ employees: data });
  }

  renderTree(list, counter) {
    return list.map((item, index) => (
      item[Object.keys(item)].employees.length === 0 ? <li
        data-id={index}
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
            key={index}
            className={`list-item-${counter}`}
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={
              this.dragStart.bind(this)}
          >{ Object.keys(item) } | { item[Object.keys(item)].position }</li>,
          this.renderTree(item[Object.keys(item)].employees, counter + 1),
      ]
    ));
  }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = 'none';
    if (e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  render() {
    const {
      employees,
    } = this.props;

    const listItems = this.renderTree(employees, 1);
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
  employees: PropTypes.array,
};

export default List;
