export const updateEmployeesIds = (employees, parentId = '', parentLevel = 0) => employees.map((person, index) => {
  const id = `${parentId}_${index}`;
  const level = parentLevel + 1;
  return {
    ...person,
    id,
    level,
    employees: updateEmployeesIds(person.employees, id, level),
  };
});

export const filterEmployees = (employees, removedId) => employees.reduce((result, person) => {
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

export const addedEmployees = (employees, leaderId, newPerson) => employees.map((person) => {
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

export const toggleCollapse = (employees, personId) => employees.map(person => ({
  ...person,
  collapsed: person.id === personId ? !person.collapsed : person.collapsed,
  employees: toggleCollapse(person.employees, personId),
}));

export const countFrequency = employees => employees.reduce((list, person) => {
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

export const personsList = employees => employees.reduce((result, person) => {
  const count = personsList(person.employees);
  return [...result, person.name, ...count];
}, []);

export const transformEmployees = (employees, parentLevel = 0) => employees.map((person) => {
  const name = Object.keys(person)[0];
  const level = parentLevel + 1;
  return {
    name,
    level,
    ...person[name],
    employees: transformEmployees(person[name].employees || [], parentLevel),
  };
});

export const getPerson = (employees = [], personId) => {
  let employee = employees.find(person => person.id === personId);
  if (employee) {
    return employee;
  }
  for (let i = 0; i < employees.length; i += 1) {
    employee = getPerson(employees[i].employees, personId);
    if (employee) {
      return employee;
    }
  }
  return undefined;
};
