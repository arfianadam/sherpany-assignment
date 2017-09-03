const CHANGE_TITLE = 'sherpany/createagenda/CHANGE_TITLE';
const SWITCH_TAB = 'sherpany/createagenda/SWITCH_TAB';

const ADD_NEW_ITEM = 'sherpany/createagenda/ADD_NEW_ITEM';

const initialState = {
  title: '',
  activeTab: 'details',
  agendaList: []
};

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
      return {
        ...state,
        agendaList: [
          ...state.agendaList,
          {
            text: action.payload
          }
        ]
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

export function addNewItem(item) {
  return {
    type: ADD_NEW_ITEM,
    payload: item
  };
}
