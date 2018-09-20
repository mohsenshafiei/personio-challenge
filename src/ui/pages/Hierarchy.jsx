import React from 'react';
import List from '../components/List.jsx';

class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Personio Company Hierarchy',
      colors: [
        'Red',
        'Green',
        'Blue',
        'Yellow',
        'Black',
        'White',
        'Orange',
      ],
      employees: {
        Sophie: {
          position: 'VP Engineering',
          employees: {
            Nick: {
              position: 'Team Lead',
              employees: {
                Pete: {
                  position: 'Backend Engineer',
                  employees: {},
                },
                Barbara: {
                  position: 'Frontend Engineer',
                  employees: {},
                },
              },
            },
          },
        },
        Iulian: {
          position: 'Engineering Manager',
          employees: {
            Carlos: {
              position: 'Team Lead',
              employees: {
                Joe: {
                  position: 'Backend Lead',
                  employees: {},
                },
                Chris: {
                  position: 'Frontend Lead',
                  employees: {},
                },
              },
            },
          },
        },
        Robert: {
          position: 'Engineering Manager',
          employees: {
            Susan: {
              position: 'Team Lead',
              employees: {
                Alex: {
                  position: 'Backend Lead',
                  employees: {},
                },
                Monica: {
                  position: 'Frontend Lead',
                  employees: {},
                },
              },
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div className="hierarchy">
        <div className="title">
          <h4>{ this.state.title }</h4>
        </div>
        <div className="list" >
          <List employees={this.state.employees}/>
        </div>
      </div>
    );
  }
}

export default Hierarchy;
