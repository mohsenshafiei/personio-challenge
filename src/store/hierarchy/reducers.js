import actionTypes from './actionTypes';
import {
  filterEmployees,
  addedEmployees,
  updateEmployeesIds,
  toggleCollapse,
  personsList,
  countFrequency,
} from './functions';

const initialState = {
  employees: JSON.parse(window.localStorage.getItem('file')) || null,
  upload: false,
  filter: 0,
  frequencies: null,
};

const hierarchyReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JSON_FILE_UPLOADED_SUCCESSFUL: {
      return {
        ...state,
        upload: action.payload,
        employees: action.data,
      };
    }
    case actionTypes.REMOVE_PERSON: {
      const employees = filterEmployees(state.employees, action.personId);
      return {
        ...state,
        employees,
      };
    }
    case actionTypes.ADD_PERSON: {
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
    case actionTypes.CHANGE_FILTER: {
      return {
        ...state,
        filter: action.filter,
      };
    }
    case actionTypes.TOGGLE_COLLAPSE:
      return {
        ...state,
        employees: toggleCollapse(state.employees, action.personId),
      };
    case actionTypes.DETECT_MULTIPLE_BOSS: {
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
