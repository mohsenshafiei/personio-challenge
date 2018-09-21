import React from 'react';
import List from '../components/List.jsx';

class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Personio Company Hierarchy',
      employees: [{
        Arsenie: {
          position: 'CTO',
          employees: [
            {
              Sophie: {
                position: 'VP Engineering',
                employees: [{
                  Nick: {
                    position: 'Team Lead',
                    employees: [
                      {
                        Pete: {
                          position: 'Backend Engineer',
                          employees: [],
                        },
                      },
                      {
                        Barbara: {
                          position: 'Frontend Engineer',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Sophie: {
                position: 'VP Engineering',
                employees: [{
                  Nick: {
                    position: 'Team Lead',
                    employees: [
                      {
                        Pete: {
                          position: 'Backend Engineer',
                          employees: [],
                        },
                      },
                      {
                        Barbara: {
                          position: 'Frontend Engineer',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Sophie: {
                position: 'VP Engineering',
                employees: [{
                  Nick: {
                    position: 'Team Lead',
                    employees: [
                      {
                        Pete: {
                          position: 'Backend Engineer',
                          employees: [],
                        },
                      },
                      {
                        Barbara: {
                          position: 'Frontend Engineer',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Iulian: {
                position: 'Engineering Manager',
                employees: [{
                  Rebeca: {
                    position: 'Team Lead',
                    employees: [
                      {
                        Chris: {
                          position: 'Backend Engineer',
                          employees: [],
                        },
                      },
                      {
                        Joe: {
                          position: 'Frontend Engineer',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Robert: {
                position: 'Engineering Manager',
                employees: [
                  {
                    Susan: {
                      position: 'Team Lead',
                      employees: [
                        {
                          Alex: {
                            position: 'Backend Lead',
                            employees: [],
                          },
                        },
                        {
                          Monica: {
                            position: 'Frontend Lead',
                            employees: [],
                          },
                        },
                      ],
                    },
                  }],
              },
            },
          ],
        },
      }],
    };
  }

  render() {
    return (
      <div className="hierarchy">
        <div className="list" >
          <List employees={this.state.employees}/>
        </div>
      </div>
    );
  }
}

export default Hierarchy;
