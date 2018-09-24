const initialState = {
  employees: JSON.parse(window.localStorage.getItem('file')) || null,
  upload: false,
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
      window.localStorage.setItem('file', JSON.stringify(employees));
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
    default:
      return state;
  }
};

export default hierarchyReducers;
