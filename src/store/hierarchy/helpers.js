export const updateEmployeesIds = (employees, parentId = '', parentLevel = 0) => employees.map((person, index) => {
  const id = parentId ? `${parentId}_${index}` : `${index}`;
  const level = parentLevel + 1;
  return {
    ...person,
    id,
    level,
    employees: updateEmployeesIds(person.employees, id, level),
  };
});

const getIdByPath = path => path.join('_');

const getPathById = id => id.split('_');

export const filterEmployees = (employees, removedId) => {
  const removedPath = getPathById(removedId);
  const index = Number(removedPath.shift());
  const person = employees[index];
  const isTargetPerson = removedPath.length === 0;
  return isTargetPerson ? [
    ...employees.slice(0, index),
    ...employees.slice(index + 1),
  ] : [
    ...employees.slice(0, index),
    {
      ...person,
      employees: filterEmployees(person.employees, getIdByPath(removedPath)),
    },
    ...employees.slice(index + 1),
  ];
};

export const addedEmployees = (employees, leaderId, newPerson) => {
  const leaderPath = getPathById(leaderId);
  const index = Number(leaderPath.shift());
  const leader = employees[index];
  const isTargetLeader = leaderPath.length === 0;
  return [
    ...employees.slice(0, index),
    {
      ...leader,
      employees: isTargetLeader
        ? [newPerson, ...leader.employees]
        : addedEmployees(leader.employees, getIdByPath(leaderPath), newPerson),
    },
    ...employees.slice(index + 1),
  ];
};

export const toggleCollapse = (employees, personId) => {
  const personPath = getPathById(personId);
  const index = Number(personPath.shift());
  const person = employees[index];
  const isTargetPerson = personPath.length === 0;
  return [
    ...employees.slice(0, index),
    {
      ...person,
      collapsed: isTargetPerson ? !person.collapsed : person.collapsed,
      employees: isTargetPerson
        ? person.employees
        : toggleCollapse(person.employees, getIdByPath(personPath)),
    },
    ...employees.slice(index + 1),
  ];
};

export const countFrequency = employeesNames => employeesNames.reduce((list, personName) => {
  if (list[personName]) {
    return {
      ...list,
      [personName]: list[personName] + 1,
    };
  }
  return {
    ...list,
    [personName]: 1,
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
