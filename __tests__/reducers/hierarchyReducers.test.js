import hierarchyReducers from '../../src/store/hierarchy/reducers';

describe('Hierarchy Reducer', () => {
  it('should return the initial state', () => {
    expect(hierarchyReducers(undefined, {})).toEqual({
      employees: null,
      upload: false,
      filter: 0,
      frequencies: null,
    });
  });

  it('should handle JSON_FILE_UPLOADED_SUCCESSFUL', () => {
    const state = {
      upload: false,
      employees: null,
    };
    const action = {
      type: 'JSON_FILE_UPLOADED_SUCCESSFUL',
      payload: true,
      data: [{
        Mohsen: {
          position: 'Front-End Developer',
          employees: [],
        }
      }],
    };
    expect(hierarchyReducers(state, action)).toEqual({
      employees: [{
        "Mohsen":
          {
            "employees": [],
            "position": "Front-End Developer"
          }
      }],
      upload: true,
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
      }], upload: true, filter: 0, frequencies: null
    }, {type: 'REMOVE_PERSON', personId: '_0_0_0'});
    expect(state).toEqual({
      employees: [{
        name: 'Arseniy',
        level: 1,
        position: 'CTO',
        employees: [{name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '_0_0'}],
        id: '_0'
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
        employees: [{name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '_0_0'}],
        id: '_0'
      }], upload: false, filter: 0, frequencies: null
    }, {
      type: 'ADD_PERSON',
      leaderId: '_0',
      person: {name: 'Nick', level: 3, position: 'Technical Product Manager Lead', employees: [], id: '_0_0_0'}
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
          id: '_0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '_0_1'}],
        id: '_0'
      }], upload: false, filter: 0, frequencies: null
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
          id: '_0_0'
        }, {name: 'Sophie', level: 2, position: 'Technical Lead', employees: [], id: '_0_1'}],
        id: '_0'
      }], upload: false, filter: 2, frequencies: null
    }, {type: 'TOGGLE_COLLAPSE', personId: '_0'});
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
        id: '_0',
        collapsed: true
      }], upload: false, filter: 2, frequencies: null
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
