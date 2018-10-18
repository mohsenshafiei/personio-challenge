import hierarchyReducers from '../../src/store/hierarchy/reducers';

describe('Hierarchy Reducer', () => {
  it('should return the initial state', () => {
    expect(hierarchyReducers(undefined, {})).toEqual({
      employees: [],
      upload: false,
      filter: 0,
      frequencies: null,
    });
  });

  it('should handle JSON_FILE_UPLOADED_SUCCESSFUL', () => {
    let state;
    state = hierarchyReducers({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Sophie',
          level: 2,
          position: 'Technical Lead',
          employees: [{
            name: 'Nick',
            level: 3,
            position: 'Technical Product Manager Lead',
            employees: [{
              name: 'Barbara',
              level: 4,
              position: 'Technical Product Manager Frontend',
              employees: [],
              id: '0_0_0_0'
            }, {name: 'Pete', level: 4, position: 'Technical Product Manager Backend', employees: [], id: '0_0_0_1'}],
            id: '0_0_0'
          }],
          id: '0_0'
        }, {
          name: 'Michael',
          level: 2,
          position: 'Backend Team Lead',
          employees: [{
            name: 'Amelia',
            level: 3,
            position: 'Backend Engineer',
            employees: [{
              name: 'Emma',
              level: 4,
              position: 'Backend Developer',
              employees: [],
              id: '0_1_0_0'
            }, {name: 'Harry', level: 4, position: 'Backend Developer', employees: [], id: '0_1_0_1'}, {
              name: 'Pete',
              level: 4,
              position: 'Technical Product Manager Backend',
              employees: [],
              id: '0_1_0_2'
            }],
            id: '0_1_0'
          }],
          id: '0_1'
        }, {
          name: 'Jackob',
          level: 2,
          position: 'Frontend Lead',
          employees: [{
            name: 'Oscar',
            level: 3,
            position: 'Frontend Engineer',
            employees: [{
              name: 'Connor',
              level: 4,
              position: 'Frontend Developer',
              employees: [],
              id: '0_2_0_0'
            }, {name: 'Noah', level: 4, position: 'Frontend Developer', employees: [], id: '0_2_0_1'}],
            id: '0_2_0'
          }],
          id: '0_2'
        }, {
          name: 'Liam',
          level: 2,
          position: 'Engineering Manager Lead',
          employees: [{
            name: 'William',
            level: 3,
            position: 'Engineering Manager',
            employees: [{
              name: 'David',
              level: 4,
              position: 'Junior Engineer Manager',
              employees: [],
              id: '0_3_0_0'
            }, {name: 'Charles', level: 4, position: 'Junior Engineer Manager', employees: [], id: '0_3_0_1'}],
            id: '0_3_0'
          }],
          id: '0_3'
        }, {
          name: 'Thomas',
          level: 2,
          position: 'Engineering Manager',
          employees: [{
            name: 'Alexander',
            level: 3,
            position: 'Team Lead',
            employees: [{
              name: 'Kyle',
              level: 4,
              position: 'Backend Lead',
              employees: [],
              id: '0_4_0_0'
            }, {name: 'Reece', level: 4, position: 'Frontend Lead', employees: [], id: '0_4_0_1'}],
            id: '0_4_0'
          }],
          id: '0_4'
        }],
        id: '0'
      }], upload: false, filter: 0, frequencies: null
    }, {
      type: 'JSON_FILE_UPLOADED_SUCCESSFUL',
      payload: true,
      data: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Sophie',
          level: 2,
          position: 'Technical Lead',
          employees: [{name: 'Nick', level: 3, position: 'Technical Product Manager Lead', employees: [], id: '0_0_0'}],
          id: '0_0'
        }],
        id: '0'
      }]
    });
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Sophie',
          level: 2,
          position: 'Technical Lead',
          employees: [{name: 'Nick', level: 3, position: 'Technical Product Manager Lead', employees: [], id: '0_0_0'}],
          id: '0_0'
        }],
        id: '0'
      }], upload: true, filter: 0, frequencies: null
    });
  });

  it('should handle REMOVE_PERSON', () => {
    let state;
    state = hierarchyReducers({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Sophie',
          level: 2,
          position: 'Technical Lead',
          employees: [{name: 'Nick', level: 3, position: 'Technical Product Manager Lead', employees: [], id: '0_0_0'}],
          id: '0_0'
        }],
        id: '0'
      }], upload: true, filter: 0, frequencies: null
    }, {type: 'REMOVE_PERSON', personId: '0_0_0'});
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '0_0'}],
        id: '0'
      }], upload: true, filter: 0, frequencies: null
    });
  });

  it('should handle ADD_PERSON', () => {
    let state;
    state = hierarchyReducers({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '0_0'}],
        id: '0'
      }], upload: true, filter: 0, frequencies: null
    }, {
      type: 'ADD_PERSON',
      leaderId: '0',
      person: {name: 'Nick', level: 3, position: 'Technical Product Manager Lead', employees: [], id: '0_0_0'}
    });
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Nick',
          level: 2,
          position: 'Technical Product Manager Lead',
          employees: [],
          id: '0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '0_1'}],
        id: '0'
      }], upload: true, filter: 0, frequencies: null
    });
  });

  it('should handle CHANGE_FILTER', () => {
    let state;
    state = hierarchyReducers({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Nick',
          level: 2,
          position: 'Technical Product Manager Lead',
          employees: [],
          id: '_0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '_0_1'}],
        id: '_0'
      }], upload: false, filter: 0, frequencies: null
    }, {type: 'CHANGE_FILTER', filter: 2});
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Nick',
          level: 2,
          position: 'Technical Product Manager Lead',
          employees: [],
          id: '_0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '_0_1'}],
        id: '_0'
      }], upload: false, filter: 2, frequencies: null
    });
  });

  it('should handle TOGGLE_COLLAPSE', () => {
    let state;
    state = hierarchyReducers({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Nick',
          level: 2,
          position: 'Technical Product Manager Lead',
          employees: [],
          id: '0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '0_1'}],
        id: '0'
      }], upload: true, filter: 0, frequencies: null
    }, {type: 'TOGGLE_COLLAPSE', personId: '0'});
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Nick',
          level: 2,
          position: 'Technical Product Manager Lead',
          employees: [],
          id: '0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '0_1'}],
        id: '0',
        collapsed: true
      }], upload: true, filter: 0, frequencies: null
    });
  });

  it('should handle DETECT_MULTIPLE_BOSS', () => {
    let state;
    state = hierarchyReducers({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Sophie',
          level: 2,
          position: 'Technical Lead',
          employees: [{
            name: 'Nick',
            level: 3,
            position: 'Technical Product Manager Lead',
            employees: [],
            id: '_0_0_0'
          }],
          id: '_0_0'
        }],
        id: '_0'
      }], upload: false, filter: 3, frequencies: null
    }, {type: 'DETECT_MULTIPLE_BOSS'});
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{
          name: 'Sophie',
          level: 2,
          position: 'Technical Lead',
          employees: [{
            name: 'Nick',
            level: 3,
            position: 'Technical Product Manager Lead',
            employees: [],
            id: '_0_0_0'
          }],
          id: '_0_0'
        }],
        id: '_0'
      }], upload: false, filter: 3, frequencies: {Arseniy: 1, Sophie: 1, Nick: 1}
    });
  });

});
