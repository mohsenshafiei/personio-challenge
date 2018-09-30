const initialState = {
  employees: JSON.parse(window.localStorage.getItem('file')) || null,
  upload: false,
  filter: 0,
  frequencies: null,
};

const updateEmployeesIds = (employees, parentId = '') => employees.map((person, index) => {
  const id = `${parentId}${index}`;
  return {
    ...person,
    id,
    employees: updateEmployeesIds(person.employees, id),
  };
});

const filterEmployees = (employees, removedId) => employees.reduce((result, person) => {
  if (person.id === removedId) {
    return result;
  }
  if (person.employees && person.employees.length) {
    const filteredPerson = {
      ...person,
      employees: filterEmployees(person.employees, removedId),
    };
    return [...result, filteredPerson];
  }
  return [...result, person];
}, []);

const addedEmployees = (employees, leaderId, newPerson) => employees.map((person) => {
  if (person.id === leaderId) {
    return {
      ...person,
      employees: [newPerson, ...person.employees],
    };
  }
  if (person.employees && person.employees.length) {
    return {
      ...person,
      employees: addedEmployees(person.employees, leaderId, newPerson),
    };
  }
  return person;
});

const toggleCollapse = (employees, personId) => employees.map(person => ({
  ...person,
  collapsed: person.id === personId ? !person.collapsed : person.collapsed,
  employees: toggleCollapse(person.employees, personId),
}));

const countFrequency = employees => employees.reduce((list, person) => {
  if (list[person]) {
    return {
      ...list,
      [person]: list[person] + 1,
    };
  }
  return {
    ...list,
    [person]: 1,
  };
}, {});

const personsList = employees => employees.reduce((result, person) => {
  const count = personsList(person.employees);
  return [...result, person.name, ...count];
}, []);

const transformEmployees = employees => employees.map((person) => {
  const name = Object.keys(person)[0];
  return {
    name,
    ...person[name],
    employees: transformEmployees(person[name].employees || []),
  };
});

const hierarchyReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'JSON_FILE_UPLOADED': {
      const employees = transformEmployees(action.payload);
      window.localStorage.setItem('file', JSON.stringify(updateEmployeesIds(employees)));
      return {
        ...state,
        employees: updateEmployeesIds(employees),
      };
    }
    case 'JSON_FILE_UPLOADED_SUCCESSFUL': {
      return {
        ...state,
        upload: action.payload,
      };
    }
    case 'REMOVE_PERSON': {
      const employees = filterEmployees(state.employees, action.personId);
      return {
        ...state,
        employees,
      };
    }
    case 'ADD_PERSON': {
      const employees = addedEmployees(state.employees, action.leaderId, action.person);
      if (action.leaderId) {
        return {
          ...state,
          employees: updateEmployeesIds(employees),
        };
      }
      return {
        ...state,
        employees: [action.person, ...state.employees],
      };
    }
    case 'CHANGE_FILTER': {
      return {
        ...state,
        filter: action.filter,
      };
    }
    case 'TOGGLE_COLLAPSE':
      return {
        ...state,
        employees: toggleCollapse(state.employees, action.personId),
      };
    case 'DETECT_MULTIPLE_BOSS': {
      const persons = personsList(state.employees);
      return {
        ...state,
        frequencies: countFrequency(persons),
      };
    }
    default:
      return state;
  }
};

export default hierarchyReducers;
