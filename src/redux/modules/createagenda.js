import { splice } from 'helpers/polyfill';

const CHANGE_TITLE = 'sherpany/createagenda/CHANGE_TITLE';
const SWITCH_TAB = 'sherpany/createagenda/SWITCH_TAB';

const ADD_NEW_ITEM = 'sherpany/createagenda/ADD_NEW_ITEM';
const ADD_NEW_FILES = 'sherpany/createagenda/ADD_NEW_FILES';

const TOGGLE_SELECT = 'sherpany/createagenda/TOGGLE_SELECT';

const initialState = {
  title: '',
  activeTab: 'details',
  agendaList: [],
  files: []
};

let lastAgendaID = 0;
let lastItemID = 0;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SWITCH_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case ADD_NEW_ITEM:
      lastAgendaID++;
      if (action.payload.isSubItem) {
        const lastItemIndex = state.agendaList.length - 1;
        const lastItem = {
          ...state.agendaList[lastItemIndex],
          items: [
            ...state.agendaList[lastItemIndex].items,
            {
              text: action.payload.item,
              label: `${state.agendaList.length}.${state.agendaList[lastItemIndex].items.length + 1} - ${action.payload.item}`, // eslint-disable-line
              id: lastAgendaID
            }
          ]
        };
        return {
          ...state,
          agendaList: [
            ...(state.agendaList.slice(0, lastItemIndex)),
            lastItem
          ]
        };
      }
      return {
        ...state,
        agendaList: [
          ...state.agendaList,
          {
            text: action.payload.item,
            label: `${state.agendaList.length + 1} - ${action.payload.item}`,
            items: [],
            id: lastAgendaID
          }
        ]
      };
    case ADD_NEW_FILES:
      return {
        ...state,
        files: [
          ...state.files, ...action.payload
        ]
      };

    case TOGGLE_SELECT:
      const index = state.files.findIndex(file => file.id === action.payload);
      const file = { ...state.files[index], checked: !state.files[index].checked };
      return {
        ...state,
        files: splice(state.files, index, 1, file)
      };
    default:
      return state;
  }
}

export function changeTitle(newTitle) {
  return {
    type: CHANGE_TITLE,
    payload: newTitle
  };
}

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    payload: tab
  };
}

export function addNewItem(item, isSubItem) {
  return {
    type: ADD_NEW_ITEM,
    payload: { item, isSubItem }
  };
}

export function addNewFiles(files) {
  const labeledFiles = files.map((file) => {
    lastItemID++;
    return { id: lastItemID, checked: false, file };
  });
  return {
    type: ADD_NEW_FILES,
    payload: labeledFiles
  };
}

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    payload: id
  };
}
