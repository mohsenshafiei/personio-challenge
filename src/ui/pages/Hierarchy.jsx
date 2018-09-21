import React from 'react';
import List from '../components/List.jsx';

class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Personio Company Hierarchy',
      employees: [{
        Arseniy: {
          position: 'CTO',
          employees: [
            {
              Sophie: {
                position: 'Technical Lead',
                employees: [{
                  Nick: {
                    position: 'Technical Product Manager Lead',
                    employees: [
                      {
                        Pete: {
                          position: 'Technical Product Manager Backend',
                          employees: [],
                        },
                      },
                      {
                        Barbara: {
                          position: 'Technical Product Manager Frontend',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Michael: {
                position: 'Backend Team Lead',
                employees: [{
                  Amelia: {
                    position: 'Backend Engineer',
                    employees: [
                      {
                        Emma: {
                          position: 'Backend Developer',
                          employees: [],
                        },
                      },
                      {
                        Harry: {
                          position: 'Backend Developer',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Jackob: {
                position: 'Frontend Lead',
                employees: [{
                  Oscar: {
                    position: 'Frontend Engineer',
                    employees: [
                      {
                        Connor: {
                          position: 'Frontend Developer',
                          employees: [],
                        },
                      },
                      {
                        Noah: {
                          position: 'Frontend Developer',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Liam: {
                position: 'Engineering Manager Lead',
                employees: [{
                  William: {
                    position: 'Engineering Manager',
                    employees: [
                      {
                        David: {
                          position: 'Junior Engineer Manager',
                          employees: [],
                        },
                      },
                      {
                        Charles: {
                          position: 'Junior Engineer Manager',
                          employees: [],
                        },
                      },
                    ],
                  },
                }],
              },
            },
            {
              Thomas: {
                position: 'Engineering Manager',
                employees: [
                  {
                    Alexander: {
                      position: 'Team Lead',
                      employees: [
                        {
                          Kyle: {
                            position: 'Backend Lead',
                            employees: [],
                          },
                        },
                        {
                          Reece: {
                            position: 'Frontend Lead',
                            employees: [],
                          },
                        },
                      ],
                    },
                  },
                ],
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
